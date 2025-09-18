import { Link, Outlet } from "react-router";
import { JobContext } from "../context/JobContext";
import { useReducer } from "react";
import { initialJobState, JobReducer } from "../reducers/JobReducer";
import { DigiFooter, DigiFooterCard, DigiIconAccessibilityUniversal, DigiIconGlobe, DigiIconSign, DigiLayoutContainer, DigiTypography } from "@digi/arbetsformedlingen-react";
import { FooterCardVariation, FooterVariation, LayoutContainerVariation } from "@digi/arbetsformedlingen";

export const Layout = () => {
	const [state, dispatch] = useReducer(JobReducer, initialJobState); // FIX - Add  initial state
	return (
		<>
			<JobContext.Provider value={{ ...state, dispatch }}>
				<DigiTypography>
					<DigiLayoutContainer
						afVerticalPadding
						afVariation={LayoutContainerVariation.FLUID}
						className="header"
					>
						<Link to={"/"} className="logo">
							<h1>JOBB SÖKAREN</h1>
						</Link>
					</DigiLayoutContainer>
					<main>
						<Outlet />
					</main>
					<DigiFooter afVariation={FooterVariation.SMALL}>
						<div slot="content-top">
							<div>
								<DigiFooterCard afType={FooterCardVariation.ICON}>
									<ul>
										<li>
											<a href="#">
												<DigiIconAccessibilityUniversal></DigiIconAccessibilityUniversal>
												Tillgänglighetsredogörelse
											</a>
										</li>
										<li>
											<a href="#">
												<DigiIconSign></DigiIconSign>
												Teckenspråk
											</a>
										</li>
										<li>
											<a href="#">
												<DigiIconGlobe></DigiIconGlobe>
												Other languages
											</a>
										</li>
									</ul>
								</DigiFooterCard>
							</div>
							<div>
								<DigiFooterCard afType={FooterCardVariation.BORDER}>
									<a href="#">Om Jobbsökaren</a>
									<p>
										Systemversion: 1.0 <br /> Ansvarig: David Kjellstrand & Nicole Sjöberg-Silfverling
									</p>
								</DigiFooterCard>
							</div>
						</div>
					</DigiFooter>
				</DigiTypography>
			</JobContext.Provider>
		</>
	);
};
