import { useContext, useState, type FormEvent } from 'react';
import { JobContext } from '../context/JobContext';
import { JobActionType } from '../reducers/JobReducer';
import { DigiFormInputSearch } from '@digi/arbetsformedlingen-react';
import {
  FormInputSearchVariation,
  FormInputType,
} from '@digi/arbetsformedlingen';
import { getSuggestions } from '../services/suggestionService';
import type { SuggestionsResponse } from '../models/Suggestions';

export const Search = () => {
  const [input, setInput] = useState('');
  const [suggestions , setSuggestions] = useState<SuggestionsResponse>({typeahead:[]})

  const { searchWord, dispatch } = useContext(JobContext);

  // ON CHANGE
  const handleChange = async (e: CustomEvent) => {
  const target = e.target as HTMLInputElement;
  const value = target.value;

  setInput(value);

  if (value.length > 0) {
    const fetchedSuggestions = await getSuggestions(value);
    setSuggestions(fetchedSuggestions); 
  } else {
    setSuggestions({ typeahead: [] });
  }
};
  console.log(input)

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
        ></DigiFormInputSearch>
      </form>
      <ul>
        {suggestions.typeahead.map((s) => (
          <li key={s.value}>{s.value}</li>
        ))}
      </ul>
    </>
  );
};
