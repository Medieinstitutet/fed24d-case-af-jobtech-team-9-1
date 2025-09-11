import { useContext, useState, type FormEvent } from 'react';
import { JobContext } from '../context/JobContext';
import { JobActionType } from '../reducers/JobReducer';
import { DigiFormInputSearch } from '@digi/arbetsformedlingen-react';
import {
  FormInputSearchVariation,
  FormInputType,
} from '@digi/arbetsformedlingen';

export const Search = () => {
  const [input, setInput] = useState('');

  const { searchWord, dispatch } = useContext(JobContext);

  // ON CHANGE
  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setInput(target.value);
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
          value={searchWord}
          onChange={handleChange}
        ></DigiFormInputSearch>
      </form>
    </>
  );
};
