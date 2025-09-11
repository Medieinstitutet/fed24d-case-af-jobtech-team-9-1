import type { SuggestionsResponse } from "../models/Suggestions";

export async function getSuggestions(input: string): Promise<SuggestionsResponse> {
  const BASE_URL = 'https://jobsearch.api.jobtechdev.se/complete';

  const MODIFIED_URL = BASE_URL + `?q=${input}&limit=5&contextual=true`;
  const response = await fetch(MODIFIED_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return response.json();
}
