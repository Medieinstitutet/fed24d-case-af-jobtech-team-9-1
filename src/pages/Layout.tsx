import { Outlet } from "react-router";
import { JobContext } from "../context/JobContext";
import { useReducer } from "react";
import { initialJobState, JobReducer } from "../reducers/JobReducer";
import {
	DigiLayoutContainer,
	DigiTypography,
} from "@digi/arbetsformedlingen-react";
import {
  LayoutContainerVariation,
} from "@digi/arbetsformedlingen";

export const Layout = () => {
	const [state, dispatch] = useReducer(JobReducer, initialJobState); // FIX - Add  initial state
	return (
		<>
			<JobContext.Provider value={{ ...state, dispatch }}>
				<DigiTypography>
          <DigiLayoutContainer afVerticalPadding afVariation={LayoutContainerVariation.FLUID} className="header">
            <h1>SÖK JOBB</h1>
          </DigiLayoutContainer>
					<main>
						<Outlet />
					</main>
					<DigiLayoutContainer afVerticalPadding afVariation={LayoutContainerVariation.FLUID} className="footer">
            <h4>Footer</h4>
          </DigiLayoutContainer>
				</DigiTypography>
			</JobContext.Provider>
		</>
	);
};
