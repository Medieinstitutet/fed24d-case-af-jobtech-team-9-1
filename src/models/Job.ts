export type Jobs = {
	hits: Job[];
};

export type Job = {
	relevance: number;
	id: string;
	external_id: string;
	label: string;
	webpage_url: string;
	logo_url: string | null;
	headline: string;
	application_deadline: string;
	number_of_vacancies: number;
	description: Description;
	employment_type: Concept;
	salary_type: Concept;
	duration: Concept;
	working_hours_type: Concept;
	employer: Employer;
	experience_required: boolean;
	driving_license_required: boolean;
	occupation: Concept;
	occupation_group: Concept;
	occupation_field: Concept;
	workplace_address: WorkplaceAddress;
	must_have: Requirements;
	nice_to_have: Requirements;
	application_details: ApplicationDetails;
};


export type Description = {
	text: string;
	text_formatted: string;
	conditions: string | null;
};

 // Används på flera ställen
export type Concept = {
	label: string;
};

export type Employer = {
	url: string | null;
	name: string;
	workplace: string;
};

export type WorkplaceAddress = {
  city: string;
  street_address: string;
  postcode: string;
	municipality: string;
	region: string;
	country: string;
};

export type Requirements = {
	skills: Concept[];
	languages: Concept[];
	work_experiences: Concept[];
	education: Concept[];
	education_level: Concept[];
};

export type ApplicationDetails = {
	information: string | null;
	reference: string | null;
	email: string | null;
	url: string | null;
};
