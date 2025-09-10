import { createContext, type Dispatch } from "react";
import type { Jobs } from "../models/Job"
import type { JobAction } from "../reducers/JobReducer";

type JobContextType = {
    jobs: Jobs;
    dispatch: Dispatch<JobAction>;        
};

export const JobContext = createContext<JobContextType>({
    jobs: {hits: []},
    dispatch: () => {}
})