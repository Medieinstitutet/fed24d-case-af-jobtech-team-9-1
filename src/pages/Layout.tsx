import { Outlet } from "react-router";
import { JobContext } from "../context/JobContext";
import { useReducer } from "react";
import { JobReducer } from "../reducers/JobReducer";
import { DigiTypography } from "@digi/arbetsformedlingen-react";

export const Layout = () => {
	const [jobs, dispatch] = useReducer(JobReducer, { hits: [] }); // FIX - Add  initial state
	return (
		<>
			<JobContext.Provider value={{ jobs, dispatch }}>
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
