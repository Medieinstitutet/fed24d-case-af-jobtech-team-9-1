export type Jobs = {
	hits: Job[];
};

export type Job = {
	id: number;
	label: string[];
	webpage_url: string;
	logo_url: string;
	headline: string;
	application_deadline: string;
	number_of_vacancies: number;
	description: Description;
};

export type Description = {
	text: string;
	conditions: string;
};
