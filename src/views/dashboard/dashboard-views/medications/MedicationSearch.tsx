import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader } from 'lucide-react';
import { searchMedications, MedicationSuggestion } from '../../../../services/medicationService';
import { useDebouncedCallback } from 'use-debounce';

interface MedicationSearchProps {
  onSelect: (medication: MedicationSuggestion) => void;
  initialValue?: string;
  onChange?: (value: string) => void;
}

export default function MedicationSearch({ onSelect, initialValue = '', onChange }: MedicationSearchProps) {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<MedicationSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const debouncedSearch = useDebouncedCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 3) {
      setSuggestions([]);
      setError(searchQuery.length > 0 ? 'Enter at least 3 characters' : null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const results = await searchMedications(searchQuery);
      setSuggestions(results);
      if (results.length === 0) {
        setError('No medications found. Try a different search term.');
      }
    } catch (error) {
      console.error('Error searching medications:', error);
      setError('Unable to search medications. Please try again.');
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, 300);

  useEffect(() => {
    if (query.trim()) {
      debouncedSearch(query);
    } else {
      setSuggestions([]);
      setError(null);
    }
  }, [query, debouncedSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
    onChange?.(value);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          placeholder="Search medications (e.g., aspirin, ibuprofen)..."
          aria-label="Search medications"
          aria-expanded={showSuggestions}
          aria-controls="medication-suggestions"
          aria-describedby={error ? "medication-search-error" : undefined}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {loading ? (
            <Loader className="h-4 w-4 text-gray-400 animate-spin" />
          ) : (
            <Search className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </div>

      {error && (
        <div 
          id="medication-search-error"
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </div>
      )}

      {showSuggestions && (query.length >= 3) && (
        <div 
          id="medication-suggestions"
          className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto"
          role="listbox"
        >
          {suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <button
                key={suggestion.rxcui}
                onClick={() => {
                  onSelect(suggestion);
                  setQuery(suggestion.name);
                  setShowSuggestions(false);
                  setError(null);
                  onChange?.(suggestion.name);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                role="option"
              >
                <div className="font-medium text-gray-900">{suggestion.name}</div>
                {(suggestion.strength || suggestion.dosageForm) && (
                  <div className="text-sm text-gray-500">
                    {[suggestion.strength, suggestion.dosageForm].filter(Boolean).join(' • ')}
                  </div>
                )}
              </button>
            ))
          ) : !loading && (
            <div className="px-4 py-2 text-sm text-gray-500">
              {query.length >= 3 ? 'No medications found' : 'Type to search medications...'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}