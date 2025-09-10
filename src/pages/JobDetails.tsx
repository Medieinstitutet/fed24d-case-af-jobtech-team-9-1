import { useEffect, useState } from "react";
import type { Job } from "../models/Job";
import { getJob } from "../services/jobServices";
import { Link, useParams } from "react-router";
import { Button } from "../components/styled/Buttons";

export const JobDetails = () => {
	const [job, setJob] = useState<Job>();

	const { id } = useParams();

	useEffect(() => {
		const getData = async () => {
			const data = await getJob(id);
			setJob(data);
		};

		if (job) return;
		getData();
	});

	return (
		<>
    <Button>Styled Button</Button>
      <Link to={"/"}>Go back</Link>
			<h1>{job?.headline}</h1>
			<h3>{job?.description.text}</h3>
		</>
	);
};
