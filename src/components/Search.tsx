import { useContext, useState, type ChangeEvent, type FormEvent } from 'react';
import { getJobs } from '../services/jobServices';
import { JobContext } from '../context/JobContext';
import { JobActionType } from '../reducers/JobReducer';

export const Search = () => {
  const [searchWord, setSearchWord] = useState('');

  const { dispatch } = useContext(JobContext);

  // ON CHANGE
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
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
      <h1>Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="sök"
          value={searchWord}
          onChange={handleChange}
        />
        <button>Sök</button>
      </form>
    </>
  );
};
