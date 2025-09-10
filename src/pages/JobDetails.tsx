import { useEffect, useState } from 'react';
import type { Job } from '../models/Job';
import { getJob } from '../services/jobServices';

export const JobDetails = () => {
  const [job, setJob] = useState<Job>();

  useEffect(() => {
    const getData = async () => {
      const data = await getJob();
      setJob(data);
    };

    if (job) return;
    getData();
  });

  return (
    <>
      Job
      <h1>{job?.headline}</h1>
      <h3>{job?.description.text}</h3>
    </>
  );
};
