import type { Job, Jobs } from "../models/Job";

const API_URL_JOB = "https://jobsearch.api.jobtechdev.se/ad/";
//  const API_URL = `https://jobsearch.api.jobtechdev.se/search?q=${Q}&offset=0&limit=10`;

const BASE_URL = `https://jobsearch.api.jobtechdev.se/search?`;
const OFFSET = `&offset=0`;
const LIMIT = `&limit=10`;

export async function getJobs(searchWord: string | null): Promise<Jobs> {
  let MODIFIED_URL = BASE_URL;
	if (searchWord) {
		const Q = `q=${searchWord}`;
    MODIFIED_URL += Q;
	}
  MODIFIED_URL += OFFSET + LIMIT;

  console.log(MODIFIED_URL)

	const response = await fetch(MODIFIED_URL);
	if (!response.ok) {
		throw new Error("Failed to fetch");
	}
	return response.json();
}

export async function getJob(id: string | undefined): Promise<Job> {
	const response = await fetch(`${API_URL_JOB}${id}`);
	if (!response.ok) {
		throw new Error("Failed to fetch specific job");
	}
	return response.json();
}
