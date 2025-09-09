import { useEffect, useState } from 'react';
import './App.css';
import { getJobs } from './services/jobServices';
import type { Jobs } from './models/Job';

function App() {
  const [jobs, setJobs] = useState<Jobs>();

  useEffect(() => {
    const getData = async () => {
      const data = await getJobs();
      setJobs(data);
    };

    if (jobs && jobs.hits.length > 0) return;
    getData();
  });

  console.log(jobs);

  return (
    <>
      <h1>TEST</h1>
      {jobs?.hits.map((job) => (
        <div key={job.id}>
          <h2>{job.headline}</h2>
          <p>{job.description[0]?.text}</p>
        </div>
      ))}
    </>
  );
}

export default App;
