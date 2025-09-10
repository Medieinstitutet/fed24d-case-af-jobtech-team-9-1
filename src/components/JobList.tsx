import { useEffect, useState } from 'react';
import type { Jobs } from '../models/Job';
import { getJobs } from '../services/jobServices';

export const JobList = () => {
  const [jobs, setJobs] = useState<Jobs>();

  useEffect(() => {
    const getData = async () => {
      const data = await getJobs();
      setJobs(data);
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
          <p>{job.description.text}</p>
          <p>{job.application_deadline}</p>
        </div>
      ))}
    </>
  );
};
