import { useEffect, useState } from "react";
import type { Job } from "../models/Job";
import { getJob } from "../services/jobServices";
import { Link, useParams } from "react-router";
import {
	DigiInfoCard,
	DigiLayoutBlock,
	DigiLayoutContainer,
	DigiLayoutMediaObject,
	DigiLinkInternal,
	DigiMediaImage,
	DigiTypographyTime,
} from "@digi/arbetsformedlingen-react";
import {
	InfoCardHeadingLevel,
	InfoCardSize,
	InfoCardType,
	InfoCardVariation,
	LayoutBlockVariation,
	LayoutContainerVariation,
	LayoutMediaObjectAlignment,
	LinkVariation,
	TypographyTimeVariation,
} from "@digi/arbetsformedlingen";
import { Qualifications } from "../components/Qualifications";

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
			<DigiLayoutContainer afVerticalPadding afVariation={LayoutContainerVariation.STATIC}>
				<Link to={"/"}>
					<DigiLinkInternal af-variation={LinkVariation.LARGE}>
						Sökresultat
					</DigiLinkInternal>
				</Link>
			</DigiLayoutContainer>
			<DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY}>
				<DigiLayoutMediaObject afAlignment={LayoutMediaObjectAlignment.START}>
					<DigiMediaImage
						// slot="media"
						// afFullwidth
						// afWidth="100"
						afHeight="100"
						afUnlazy
						afSrc={`${job?.logo_url}`}
						af-alt={`${job?.employer.name}`}
					></DigiMediaImage>
				</DigiLayoutMediaObject>
				<h1>{job?.headline}</h1>
				<h2>{job?.employer.name}</h2>
				<h4>{job?.occupation.label}</h4>
				<h4>Komun: {job?.workplace_address.municipality}</h4>
			</DigiLayoutBlock>
			<DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY}>
				<DigiLayoutContainer afNoGutter>
					<span>Omfattning: </span>
					<span>{job?.working_hours_type.label}</span>
				</DigiLayoutContainer>
				<DigiLayoutContainer afNoGutter>
					<span>Varaktighet: </span>
					<span>{job?.duration.label}</span>
				</DigiLayoutContainer>
				<DigiLayoutContainer afNoGutter>
					<span>Lediga tjänster: </span>
					<span>{job?.number_of_vacancies}</span>
				</DigiLayoutContainer>
			</DigiLayoutBlock>

			{/* QUALIFICATIONS HÄR*/}
			<Qualifications job={job}></Qualifications>

			<DigiLayoutBlock afMarginTop afVariation={LayoutBlockVariation.PRIMARY}>
				<DigiInfoCard
					af-heading="Beskrivning"
					af-heading-level={InfoCardHeadingLevel.H3}
					afSize={InfoCardSize.STANDARD}
					afType={InfoCardType.RELATED}
					afLinkHref={job?.webpage_url}
					afLinkText="Till jobbet"
					afVariation={InfoCardVariation.SECONDARY}
				>
					<div
						dangerouslySetInnerHTML={{
							__html: job?.description.text_formatted ?? "",
						}}
					/>
				</DigiInfoCard>
			</DigiLayoutBlock>
			<DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY}>
				<ul>
					<li>{job?.occupation_field.label}</li>
					<li>{job?.workplace_address.country}</li>
					<li>{job?.workplace_address.region}</li>
					<li>{job?.workplace_address.country}</li>
					<li>{job?.salary_type.label}</li>
				</ul>
				<DigiTypographyTime
					afVariation={TypographyTimeVariation.DISTANCE}
					afDateTime={job?.application_deadline}
				></DigiTypographyTime>
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
			</DigiLayoutBlock>
		</>
	);
};
