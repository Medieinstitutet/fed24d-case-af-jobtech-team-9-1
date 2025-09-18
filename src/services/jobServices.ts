import type { Job, Jobs } from "../models/Job";

const API_URL_JOB = "https://jobsearch.api.jobtechdev.se/ad/";

const BASE_URL = `https://jobsearch.api.jobtechdev.se/search?`;
const LIMIT = `&limit=10`;

// GET JOBS

export async function getJobs(searchWord?: string, offset?: number): Promise<Jobs> {
	let MODIFIED_URL = BASE_URL;
	if (searchWord) {
		const Q = `q=${searchWord}`;
		MODIFIED_URL += Q;
	}
	const OFFSET = `&offset=${offset}`;

	MODIFIED_URL += OFFSET + LIMIT;

	console.log(MODIFIED_URL);

	const response = await fetch(MODIFIED_URL);
	if (!response.ok) {
		throw new Error("Failed to fetch");
	}
	return response.json();
}

// GET JOB

export async function getJob(id: string | undefined): Promise<Job> {
	const response = await fetch(`${API_URL_JOB}${id}`);
	if (!response.ok) {
		throw new Error("Failed to fetch specific job");
	}
	return response.json();
}
