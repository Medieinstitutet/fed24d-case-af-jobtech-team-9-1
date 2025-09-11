import type { Jobs } from "../models/Job";

export enum JobActionType {
	SET_JOBS = "SET_JOBS",
	SET_OFFSET = "SET_OFFSET",
	SET_SEARCH = "SET_SEARCH",
}

export type JobAction =
	| { type: JobActionType.SET_JOBS; payload: Jobs }
	| { type: JobActionType.SET_OFFSET; payload: number }
	| { type: JobActionType.SET_SEARCH; payload: string };

export interface JobState {
	jobs: Jobs;
	offset: number;
	searchWord: string;
}

export const initialJobState: JobState = {
	jobs: { hits: [] },
	offset: 0,
	searchWord: "",
};

export const JobReducer = (state: JobState, action: JobAction): JobState => {
	switch (action.type) {
		case JobActionType.SET_JOBS: {
			return { ...state, jobs: action.payload };
		}
		case JobActionType.SET_OFFSET: {
			return { ...state, offset: action.payload };
		}
		case JobActionType.SET_SEARCH: {
			return { ...state, searchWord: action.payload, offset: 0 };
		}

		default:
			return state;
	}
};
