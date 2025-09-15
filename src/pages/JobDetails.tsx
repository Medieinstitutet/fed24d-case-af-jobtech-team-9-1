import { useEffect, useState } from "react";
import type { Job } from "../models/Job";
import { getJob } from "../services/jobServices";
import { Link, useParams } from "react-router";
import {
	DigiIconAt,
	DigiIconChevronLeft,
	DigiIconGlobe,
	DigiIconMarkerFilled,
	DigiInfoCard,
	DigiLayoutBlock,
	DigiLayoutContainer,
	DigiLink,
	DigiLinkExternal,
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
					<DigiLink af-variation={LinkVariation.LARGE}>
						<DigiIconChevronLeft/>
						<span>Sökresultat</span>
					</DigiLink>
				</Link>
			</DigiLayoutContainer>
			<DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY}>
				{/* <DigiLayoutMediaObject afAlignment={LayoutMediaObjectAlignment.START}> */}
					<DigiMediaImage
						afHeight="100"
						afUnlazy
						afSrc={`${job?.logo_url}`}
						af-alt={`${job?.employer.name}`}
					></DigiMediaImage>
				{/* </DigiLayoutMediaObject> */}
				<h1>{job?.headline}</h1>
				<h2>{job?.employer.name}</h2>
				<h4>{job?.occupation.label}</h4>
				<h4>Komun: {job?.workplace_address.municipality}</h4>
			</DigiLayoutBlock>
			<DigiLayoutBlock afMarginBottom afVariation={LayoutBlockVariation.PRIMARY}>
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

			<DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY}>
				<DigiInfoCard
					af-heading="Beskrivning"
					af-heading-level={InfoCardHeadingLevel.H3}
					afSize={InfoCardSize.STANDARD}
					afType={InfoCardType.RELATED}
					afVariation={InfoCardVariation.SECONDARY}
				>
					<div
						dangerouslySetInnerHTML={{
							__html: job?.description.text_formatted ?? "",
						}}
					/>
				</DigiInfoCard>
			</DigiLayoutBlock>
			<DigiLayoutBlock afMarginBottom afMarginTop afVariation={LayoutBlockVariation.PRIMARY}>
				<h2>Om anställningen</h2>
				<h3>Lön</h3>
				<p>Lönetyp: {job?.salary_type.label}</p>
				<h3>Antällningsvillkor</h3>
				<p>{job?.description.conditions}</p>
				<h3>Var ligger arbetsplatsen?</h3>
				<DigiLayoutContainer afNoGutter afMarginBottom>
					<div
						style={{
							display: "flex",
							gap: "0.5rem",
						}}
					>
						<DigiIconMarkerFilled style={{ width: "18px", height: "18px" }} />
						<span>{job?.workplace_address.street_address} </span>
						<span>{job?.workplace_address.region} </span>
						<span>{job?.workplace_address.municipality} </span>
						<span>{job?.workplace_address.postcode} </span>
						<span>{job?.workplace_address.city} </span>
					</div>
				</DigiLayoutContainer>
				<h3>Arbetsgivaren</h3>
				<p>{job?.employer.name}</p>
				<DigiLinkExternal af-href={job?.employer.url} afTarget="_blank">
					Till {job?.employer.url}
				</DigiLinkExternal>
			</DigiLayoutBlock>
			<DigiLayoutBlock afVerticalPadding afVariation={LayoutBlockVariation.SECONDARY}>
				<h2>Sök jobbet</h2>
				<p>
					Ange referens <strong>{job?.application_details.reference}</strong> i din
					ansökan
				</p>

				<span>Ansök senast: </span>
				<strong>
					<DigiTypographyTime
						afVariation={TypographyTimeVariation.PRETTY}
						afDateTime={job?.application_deadline}
					/>
				</strong>

				<p>
					<DigiTypographyTime
						afVariation={TypographyTimeVariation.DISTANCE}
						afDateTime={job?.application_deadline}
					/>
				</p>
			</DigiLayoutBlock>

			{job?.application_details.email && (
				<DigiLayoutBlock afVerticalPadding afVariation={LayoutBlockVariation.SECONDARY}>
					<div
						style={{
							display: "flex",
							gap: "0.5rem",
						}}
					>
						<DigiIconAt style={{ width: "18px", height: "18px" }} />
						<h3>Ansök via mejl</h3>
					</div>
					<p>Mejla din ansökan till</p>
					<DigiLink af-href={`mailto:${job.application_details.email}`}>
						{job.application_details.email}
					</DigiLink>
				</DigiLayoutBlock>
			)}

			{job?.application_details.url && (
				<DigiLayoutBlock afVerticalPadding afVariation={LayoutBlockVariation.SECONDARY}>
					<div
						style={{
							display: "flex",
							gap: "0.5rem",
						}}
					>
						<DigiIconGlobe style={{ width: "18px", height: "18px" }} />
						<h3>Ansök via arbetsgivarens webbplats</h3>
					</div>
					<DigiLink af-href={job.application_details.url} afTarget="_blank">
						{job.application_details.url}
					</DigiLink>
				</DigiLayoutBlock>
			)}
		</>
	);
};
