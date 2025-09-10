import type { Jobs } from "../models/Job"

export enum JobActionType {
    SET_JOBS
}

export type JobAction = {
    type: JobActionType,
    payload: Jobs
}

export const JobReducer = (jobs: Jobs, action: JobAction) => {
    switch (action.type) {
        case JobActionType.SET_JOBS:{
            const returnValue = action.payload;
            return returnValue;
        }
        default:
            return jobs;
    }

}