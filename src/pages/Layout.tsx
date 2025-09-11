import { Outlet } from "react-router";
import { JobContext } from "../context/JobContext";
import { useReducer } from "react";
import { initialJobState, JobReducer } from "../reducers/JobReducer";
import { DigiTypography } from "@digi/arbetsformedlingen-react";

export const Layout = () => {
	const [state, dispatch] = useReducer(JobReducer, initialJobState); // FIX - Add  initial state
	return (
		<>
			<JobContext.Provider value={{ ...state, dispatch }}>
				<DigiTypography>
					<header>Header</header>
					<main>
						<Outlet />
					</main>
					<footer>Footer</footer>
				</DigiTypography>
			</JobContext.Provider>
		</>
	);
};
