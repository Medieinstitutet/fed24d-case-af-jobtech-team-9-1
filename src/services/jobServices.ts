const API_URL = "https://jobsearch.api.jobtechdev.se/search?q=java&offset=0&limit=10";

export async function getJobs(): Promise<[]> {
  const response = await fetch(API_URL);
  if(!response.ok) {
    throw new Error("Failed to fetch");
  }
  return response.json();
}