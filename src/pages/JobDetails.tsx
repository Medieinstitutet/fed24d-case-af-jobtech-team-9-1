import { useEffect, useState } from "react";
import type { Job } from "../models/Job";
import { getJob } from "../services/jobServices";
import { Link, useParams } from "react-router";
import {
	DigiInfoCard,
	DigiLayoutBlock,
	DigiLinkInternal,
	DigiMediaImage,
} from "@digi/arbetsformedlingen-react";
import {
	InfoCardHeadingLevel,
	InfoCardSize,
	InfoCardType,
	InfoCardVariation,
	LayoutBlockVariation,
	LinkVariation,
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
				<Link to={"/"}>
					<DigiLinkInternal af-variation={LinkVariation.SMALL}>
						Sökresultat
					</DigiLinkInternal>
				</Link>
				<h1>{job?.headline}</h1>
				<DigiMediaImage
					afUnlazy
					afHeight="100"
					afWidth="100"
					afSrc={`${job?.logo_url}`}
					af-alt={`${job?.employer.name}`}
				></DigiMediaImage>
				<h2>{job?.employer.name}</h2>
				<h3>{job?.occupation.label}</h3>
				<p>{job?.occupation_field.label}</p>
				<p>{job?.working_hours_type.label}</p>
				<p>{job?.duration.label}</p>
				<p>{job?.workplace_address.country}</p>
				<p>{job?.workplace_address.region}</p>
				<p>{job?.workplace_address.country}</p>
				<p>Lediga tjänster: {job?.number_of_vacancies}</p>
				<p>{job?.salary_type.label}</p>
				<p>Sök senast: {job?.application_deadline}</p>
				<p>
					Körkort:
					{job?.driving_license_required === true
						? " Ja"
						: job?.driving_license_required === false
						? " Nej"
						: " Ej angivet"}
				</p>
				<p>
					Kräver erfarenhet:
					{job?.experience_required === true
						? " Ja"
						: job?.experience_required === false
						? " Nej"
						: " Ej angivet"}
				</p>
				<DigiInfoCard
					af-heading="Beskrivning"
					afSize={InfoCardSize.STANDARD}
					af-heading-level={InfoCardHeadingLevel.H3}
					afType={InfoCardType.TIP}
					afLinkHref={job?.webpage_url}
					afLinkText="Till jobbet"
					afVariation={InfoCardVariation.PRIMARY}
				>
					<div
						dangerouslySetInnerHTML={{
							__html: job?.description.text_formatted ?? "",
						}}
					/>
				</DigiInfoCard>
			</DigiLayoutBlock>
		</>
	);
};
