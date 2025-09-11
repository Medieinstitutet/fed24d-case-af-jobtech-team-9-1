import { createContext, type Dispatch } from "react";
import type { Jobs } from "../models/Job"
import type { JobAction } from "../reducers/JobReducer";

type JobContextType = {
    jobs: Jobs;
    offset: number;
    searchWord: string;
    dispatch: Dispatch<JobAction>;        
};

export const JobContext = createContext<JobContextType>({
    jobs: {hits: []},
    offset: 0,
    searchWord: "",
    dispatch: () => {}
})