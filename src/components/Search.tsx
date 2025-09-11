import { useContext, useState, type FormEvent } from 'react';
import { getJobs } from '../services/jobServices';
import { JobContext } from '../context/JobContext';
import { JobActionType } from '../reducers/JobReducer';
import { DigiFormInputSearch } from '@digi/arbetsformedlingen-react';
import {
  FormInputSearchVariation,
  FormInputType,
} from '@digi/arbetsformedlingen';

export const Search = () => {
  const [searchWord, setSearchWord] = useState('');

  const { dispatch } = useContext(JobContext);

  // ON CHANGE
  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchWord(target.value);
  };

  // ON SUBMIT
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await getJobs(searchWord);
    console.log(response);
    dispatch({
      type: JobActionType.SET_JOBS,
      payload: response,
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
