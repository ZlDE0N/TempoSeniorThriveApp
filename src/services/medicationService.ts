import { z } from 'zod';

const rxNormBaseUrl = 'https://rxnav.nlm.nih.gov/REST';

// Add fallback medications for when API fails
const fallbackMedications = [
  { rxcui: '161', name: 'Acetaminophen', strength: '325 mg', dosageForm: 'Oral Tablet' },
  { rxcui: '1191', name: 'Aspirin', strength: '325 mg', dosageForm: 'Oral Tablet' },
  { rxcui: '5640', name: 'Ibuprofen', strength: '200 mg', dosageForm: 'Oral Tablet' },
  { rxcui: '1739', name: 'Diphenhydramine', strength: '25 mg', dosageForm: 'Oral Capsule' },
  { rxcui: '1124', name: 'Amoxicillin', strength: '500 mg', dosageForm: 'Oral Capsule' }
];

export interface MedicationSuggestion {
  rxcui: string;
  name: string;
  synonym?: string;
  strength?: string;
  dosageForm?: string;
}

const searchResponseSchema = z.object({
  suggestionGroup: z.object({
    suggestionList: z.object({
      suggestion: z.array(z.string())
    }).optional()
  }).optional()
});

const rxcuiResponseSchema = z.object({
  idGroup: z.object({
    rxnormId: z.array(z.string()).optional()
  }).optional()
});

const medicationDetailsSchema = z.object({
  propConceptGroup: z.object({
    propConcept: z.array(z.object({
      propName: z.string(),
      propValue: z.string()
    })).optional()
  }).optional()
});

export async function searchMedications(query: string): Promise<MedicationSuggestion[]> {
  if (!query || query.length < 3) return [];

  try {
    // First try direct RxCUI search
    const directResponse = await fetch(
      `${rxNormBaseUrl}/rxcui.json?name=${encodeURIComponent(query)}`,
      { signal: AbortSignal.timeout(5000) } // 5 second timeout
    );

    if (directResponse.ok) {
      const directData = await directResponse.json();
      const parsedDirect = rxcuiResponseSchema.safeParse(directData);

      if (parsedDirect.success && parsedDirect.data.idGroup?.rxnormId?.[0]) {
        const details = await getMedicationDetails(parsedDirect.data.idGroup.rxnormId[0]);
        return [{
          rxcui: parsedDirect.data.idGroup.rxnormId[0],
          name: query,
          ...details
        }];
      }
    }

    // If direct search fails, try spelling suggestions
    const suggestResponse = await fetch(
      `${rxNormBaseUrl}/spellingsuggestions?name=${encodeURIComponent(query)}`,
      { signal: AbortSignal.timeout(5000) }
    );
    
    if (!suggestResponse.ok) {
      // Fall back to local search if API fails
      return fallbackMedications.filter(med => 
        med.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    const suggestData = await suggestResponse.json();
    const parsed = searchResponseSchema.safeParse(suggestData);

    if (!parsed.success || !parsed.data.suggestionGroup?.suggestionList?.suggestion) {
      // Fall back to local search if parsing fails
      return fallbackMedications.filter(med => 
        med.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // For each suggestion, get the RxNorm concept
    const searchPromises = parsed.data.suggestionGroup.suggestionList.suggestion
      .slice(0, 5) // Limit to top 5 suggestions for performance
      .map(async (term) => {
        try {
          const searchResponse = await fetch(
            `${rxNormBaseUrl}/rxcui.json?name=${encodeURIComponent(term)}`,
            { signal: AbortSignal.timeout(5000) }
          );

          if (!searchResponse.ok) {
            return null;
          }

          const searchData = await searchResponse.json();
          const parsedSearch = rxcuiResponseSchema.safeParse(searchData);

          if (!parsedSearch.success || !parsedSearch.data.idGroup?.rxnormId?.[0]) {
            return null;
          }

          const details = await getMedicationDetails(parsedSearch.data.idGroup.rxnormId[0]);
          return {
            rxcui: parsedSearch.data.idGroup.rxnormId[0],
            name: term,
            ...details
          };
        } catch (error) {
          return null;
        }
      });

    const results = await Promise.all(searchPromises);
    const validResults = results.filter((result): result is MedicationSuggestion => result !== null);

    // If no results from API, fall back to local search
    if (validResults.length === 0) {
      return fallbackMedications.filter(med => 
        med.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    return validResults;
  } catch (error) {
    // Fall back to local search on any error
    return fallbackMedications.filter(med => 
      med.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}

async function getMedicationDetails(rxcui: string): Promise<Partial<MedicationSuggestion>> {
  try {
    const response = await fetch(
      `${rxNormBaseUrl}/rxcui/${rxcui}/allProperties.json?prop=attributes`,
      { signal: AbortSignal.timeout(5000) }
    );

    if (!response.ok) {
      return {};
    }

    const data = await response.json();
    const parsed = medicationDetailsSchema.safeParse(data);

    if (!parsed.success || !parsed.data.propConceptGroup?.propConcept) {
      return {};
    }

    const props = parsed.data.propConceptGroup.propConcept;
    const details: Partial<MedicationSuggestion> = {};

    for (const prop of props) {
      switch (prop.propName) {
        case 'RxNorm Dose Form':
        case 'DOSEFORMNAME':
          details.dosageForm = prop.propValue;
          break;
        case 'STRENGTH':
        case 'AVAILABLE_STRENGTH':
          details.strength = prop.propValue;
          break;
        case 'SYNONYM':
        case 'DISPLAY_NAME':
          details.synonym = prop.propValue;
          break;
      }
    }

    return details;
  } catch (error) {
    return {};
  }
}