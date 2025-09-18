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
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

export const Search = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestions[]>([]);

  const { dispatch } = useContext(JobContext);

  // ON CHANGE
  const handleChange = async (e: CustomEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    setInput(value);
    setActiveIndex(-1);

    if (value.length > 0) {
      const result: SuggestionsResponse = await getSuggestions(value);
      setSuggestions(result.typeahead);
    } else {
      setSuggestions([]);
    }
  };

   // ON KEY DOWN (arrow + enter)
  const { activeIndex, setActiveIndex, handleKeyDown } = useKeyboardNavigation(
    suggestions,
    (item) => handleSelect(item.value)
  );

  // SELECT suggestion
  const handleSelect = (value: string) => {
    setInput(value);
    setSuggestions([]);
    setActiveIndex(-1);
  };

  // ON SUBMIT
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: JobActionType.SET_SEARCH,
      payload: input,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DigiFormInputSearch
          afLabel="Hitta lediga jobb"
          afVariation={FormInputSearchVariation.MEDIUM}
          afType={FormInputType.SEARCH}
          afButtonText="Sök"
          value={input}
          onAfOnInput={handleChange}
          onKeyDown={handleKeyDown} //  listen for arrows/enter
          className="search-custom"
        />
      </form>
      {suggestions.length > 0 && input.length > 0 && (
        <SuggestionsList
          suggestions={suggestions}
          activeIndex={activeIndex}
          onSelect={handleSelect}
        />
      )}
    </>
  );
};
