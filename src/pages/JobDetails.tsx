import { useEffect, useState } from "react";
import type { Job } from "../models/Job";
import { getJob } from "../services/jobServices";
import { Link, useParams } from "react-router";
import { DigiInfoCard, DigiLayoutBlock, DigiLinkButton } from "@digi/arbetsformedlingen-react";
import {
	InfoCardHeadingLevel,
	InfoCardType,
	InfoCardVariation,
	LayoutBlockVariation,
	LinkButtonVariation,
} from "@digi/arbetsformedlingen";

export const JobDetails = () => {
	const [job, setJob] = useState<Job>();

	const { id } = useParams();

	useEffect(() => {
		const getData = async () => {
			const data = await getJob(id);
			setJob(data);
		};

		if (job) return;
		getData();
	});

	return (
		<>
			<DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY}>
				<h1>{job?.headline}</h1>
				<Link to={"/"}>
					<DigiLinkButton afVariation={LinkButtonVariation.PRIMARY}>
						Go back
					</DigiLinkButton>
				</Link>
				<DigiInfoCard
					afHeading={job?.headline}
					afHeadingLevel={InfoCardHeadingLevel.H2}
					afType={InfoCardType.TIP}
					afLinkHref="Frivillig länk"
					afLinkText="Frivillig länktext"
					afVariation={InfoCardVariation.PRIMARY}
				>
					<p>{job?.description.text}</p>
				</DigiInfoCard>
			</DigiLayoutBlock>
		</>
	);
};
