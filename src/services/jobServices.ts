import type { Job, Jobs } from "../models/Job";

const Q = "java"
const API_URL = `https://jobsearch.api.jobtechdev.se/search?q=${Q}&offset=0&limit=10`;
const API_URL_JOB = "https://jobsearch.api.jobtechdev.se/ad/";
const ID = "29958628";

export async function getJobs(): Promise<Jobs> {
	const response = await fetch(API_URL);
	if (!response.ok) {
		throw new Error("Failed to fetch");
	}
	return response.json();
}

export async function getJob(): Promise<Job> {
	const response = await fetch(`${API_URL_JOB}${ID}`);
	if (!response.ok) {
		throw new Error("Failed to fetch specific job");
	}
	return response.json();
}
