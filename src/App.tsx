import { useEffect, useState } from "react";
import "./App.css";
import { getJob, getJobs } from "./services/jobServices";
import type { Job, Jobs } from "./models/Job";
import { RouterProvider } from "react-router";
import { router } from "./Router";

function App() {
	const [jobs, setJobs] = useState<Jobs>();
	const [job, setJob] = useState<Job>();

	useEffect(() => {
		const getData = async () => {
			const data = await getJobs();
			setJobs(data);
		};

		if (jobs && jobs.hits.length > 0) return;
		getData();
	});

	// console.log(jobs);

	// GET JOB BY ID

	useEffect(() => {
		const getData = async () => {
			const data = await getJob();
			setJob(data);
		};

		if (job) return;
		getData();
	});

	console.log(job);

	return (
		<>
			<RouterProvider router={router}></RouterProvider>
			<h1>TEST</h1>
			{jobs?.hits.map((job) => (
				<div key={job.id}>
					<h2>{job.headline}</h2>
					<p>{job.description.text}</p>
					<p>{job.application_deadline}</p>
				</div>
			))}
      <h1>{job?.headline}</h1>
      <h3>{job?.description.text}</h3>
		</>
	);
}

export default App;
