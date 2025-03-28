const BASE_URL = 'https://api.fda.gov/drug/label.json';

export async function fdaServicesSearch(name: string) {
  try {
    const res = await fetch(`${BASE_URL}?search=openfda.brand_name:${name}&limit=10`);
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching FDA data:', error);
    return [];
  }
}
