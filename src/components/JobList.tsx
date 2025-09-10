import { useContext, useEffect} from 'react';
import { getJobs } from '../services/jobServices';
import { Link } from 'react-router';
import { JobContext } from '../context/JobContext';
import { JobActionType } from '../reducers/JobReducer';

export const JobList = () => {
  const {jobs, dispatch} = useContext(JobContext);

  useEffect(() => {
    const getData = async () => {
      const data = await getJobs();
      dispatch({ type: JobActionType.SET_JOBS, payload: data });
    };

    if (jobs && jobs.hits.length > 0) return;
    getData();
  });
  return (
    <>
      Job list
      {jobs?.hits.map((job) => (
        <div key={job.id}>
          <h2>{job.headline}</h2>
          <Link to={`/job/${job.id}`}>Got to job</Link>
          {/* <p>{job.description.text}</p> */}
          <p>{job.application_deadline}</p>
        </div>
      ))}
    </>
  );
};
