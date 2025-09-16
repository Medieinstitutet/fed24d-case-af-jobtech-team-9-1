import { useState, useContext, type FormEvent } from 'react';
import { JobContext } from '../context/JobContext';
import { JobActionType } from '../reducers/JobReducer';
import { DigiFormInputSearch } from '@digi/arbetsformedlingen-react';
import {
  FormInputSearchVariation,
  FormInputType,
} from '@digi/arbetsformedlingen';
import { getSuggestions } from '../services/suggestionService';
import type { Suggestions, SuggestionsResponse } from '../models/Suggestions';
import { SuggestionsList } from './SuggestionsList';

export const Search = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestions[]>([]);

  const { searchWord, dispatch } = useContext(JobContext);

  // ON CHANGE
  const handleChange = async (e: CustomEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    setInput(value);

    if (value.length > 0) {
      const result: SuggestionsResponse = await getSuggestions(value);
      setSuggestions(result.typeahead);
    } else {
      setSuggestions([]);
    }
  };

  // handle selecting a suggestion
  const handleSelect = (value: string) => {
    setInput(value);
    setSuggestions([]);
  };

  // ON SUBMIT
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: JobActionType.SET_SEARCH,
      payload: input,
    });
  };

  console.log(searchWord);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DigiFormInputSearch
          afLabel="Hitta lediga jobb"
          afVariation={FormInputSearchVariation.SMALL}
          afType={FormInputType.SEARCH}
          afButtonText="Sök"
          value={input}
          onAfOnInput={handleChange}
        />
      </form>
      {suggestions.length > 0 && (
        <SuggestionsList suggestions={suggestions} onSelect={handleSelect} />
      )}
    </>
  );
};
