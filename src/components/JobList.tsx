import { useContext, useEffect } from "react";
import { getJobs } from "../services/jobServices";
import { Link } from "react-router";
import { JobContext } from "../context/JobContext";
import { JobActionType } from "../reducers/JobReducer";

const LIMIT = 10;

export const JobList = () => {
	const { offset, searchWord, jobs, dispatch } = useContext(JobContext);

	useEffect(() => {
		const getData = async () => {
			const data = await getJobs(searchWord, offset);
			dispatch({ type: JobActionType.SET_JOBS, payload: data });
		};

		getData();
	}, [dispatch, offset, searchWord]); // <- hämta nytt varje gång offset ändras

	const fetchPrevPage = () => {
		dispatch({ type: JobActionType.SET_OFFSET, payload: Math.max(offset - LIMIT, 0) });
	};

	const fetchNextPage = () => {
		dispatch({ type: JobActionType.SET_OFFSET, payload: offset + LIMIT });
	};

	return (
		<>
			<h2>Job list</h2>
			<div>
				<button onClick={() => fetchPrevPage()} disabled={offset === 0}>
					Previous
				</button>
				<span>Page {offset / LIMIT + 1}</span>
				<button onClick={() => fetchNextPage()} disabled={jobs?.hits.length < LIMIT}>
					Next
				</button>
			</div>
			{jobs?.hits.map((job) => (
				<div key={job.id}>
					<h2>{job.headline}</h2>
					<Link to={`/job/${job.id}`}>Got to job</Link>
					<p>{job.application_deadline}</p>
				</div>
			))}
		</>
	);
};
