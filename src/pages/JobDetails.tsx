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
	DigiLayoutMediaObject,
	DigiLink,
	DigiLinkExternal,
	DigiLoaderSkeleton,
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
	LoaderSkeletonVariation,
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
			{!job && (
				<DigiLoaderSkeleton
					afVariation={LoaderSkeletonVariation.SECTION}
					af-count="4"
				></DigiLoaderSkeleton>
			)}
			<DigiLayoutContainer afVerticalPadding afVariation={LayoutContainerVariation.STATIC}>
				<Link to={"/"}>
					<DigiLink af-variation={LinkVariation.LARGE}>
						<DigiIconChevronLeft />
						<span>Sökresultat</span>
					</DigiLink>
				</Link>
			</DigiLayoutContainer>
			<DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY}>
				<DigiLayoutMediaObject>
					{job?.logo_url && (
						<DigiMediaImage
							slot="media"
							// af-height="100"
							af-unlazy
							af-width="150"
							style={{ width: "10px" }}
							af-src={`${job?.logo_url}`}
							af-alt={`${job?.employer.name}`}
							// afObserverOptions={{ rootMargin: "10px", threshold: 0 }}
						/>
					)}
				</DigiLayoutMediaObject>

				<h1>{job?.headline}</h1>
				<h2>{job?.employer.name}</h2>
				<h4>{job?.occupation.label}</h4>
				<h4>{job?.workplace_address.municipality}</h4>
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
					<p
						dangerouslySetInnerHTML={{
							__html: job?.description.text_formatted ?? "",
						}}
					/>
					<div>
						{!job?.description.text_formatted && (
							<p style={{ whiteSpace: "pre-line" }}>{job?.description.text}</p>
						)}
					</div>
				</DigiInfoCard>
			</DigiLayoutBlock>
			<DigiLayoutBlock afMarginBottom afMarginTop afVariation={LayoutBlockVariation.PRIMARY}>
				<h2>Om anställningen</h2>
				<DigiLayoutContainer afMarginBottom afNoGutter>
					<h3>Lön</h3>
					<p>Lönetyp: {job?.salary_type.label}</p>
				</DigiLayoutContainer>
				<DigiLayoutContainer afMarginBottom afNoGutter>
					{job?.description.conditions && (
						<>
							<h3>Antällningsvillkor</h3>
							<p>{job?.description.conditions}</p>
						</>
					)}
				</DigiLayoutContainer>
				<DigiLayoutContainer afMarginBottom afNoGutter>
					{(job?.workplace_address.city ||
						job?.workplace_address.municipality ||
						job?.workplace_address.postcode ||
						job?.workplace_address.region ||
						job?.workplace_address.street_address) && (
						<>
							<h3>Var ligger arbetsplatsen?</h3>
							<DigiLayoutContainer afNoGutter afMarginBottom>
								<div
									style={{
										display: "flex",
										gap: "0.5rem",
									}}
								>
									<DigiIconMarkerFilled
										style={{ width: "18px", height: "18px" }}
									/>
									<span>{job?.workplace_address.street_address} </span>
									<span>{job?.workplace_address.region} </span>
									<span>{job?.workplace_address.municipality} </span>
									<span>{job?.workplace_address.postcode} </span>
									<span>{job?.workplace_address.city} </span>
								</div>
							</DigiLayoutContainer>
						</>
					)}
				</DigiLayoutContainer>

				<DigiLayoutContainer afMarginBottom afNoGutter>
					<h3>Arbetsgivaren</h3>
					<p>{job?.employer.name}</p>
					<div>
						{job?.employer.url && (
							<DigiLinkExternal af-href={job?.employer.url} afTarget="_blank">
								{`Besök ${job?.employer.url}`}
							</DigiLinkExternal>
						)}
					</div>
				</DigiLayoutContainer>
			</DigiLayoutBlock>
			<DigiLayoutBlock afVerticalPadding afVariation={LayoutBlockVariation.SECONDARY}>
				<h2>Sök jobbet</h2>
				<p>
					Ansök senast:
					<strong>
						{" "}
						<DigiTypographyTime
							afVariation={TypographyTimeVariation.PRETTY}
							afDateTime={job?.application_deadline}
						/>
					</strong>
					{" - "}
					<DigiTypographyTime
						afVariation={TypographyTimeVariation.DISTANCE}
						afDateTime={job?.application_deadline}
					/>
				</p>
				<DigiLayoutContainer afMarginBottom afNoGutter>
					{job?.application_details.url && (
						<>
							<div
								style={{
									display: "flex",
									gap: "0.5rem",
								}}
							>
								<DigiIconGlobe style={{ width: "18px", height: "18px" }} />
								<h3>Ansök via arbetsgivarens webbplats</h3>
							</div>
							<DigiLinkExternal
								af-href={job.application_details.url}
								afTarget="_blank"
							>
								Gå till ansökan
							</DigiLinkExternal>
						</>
					)}
				</DigiLayoutContainer>
				<DigiLayoutContainer afMarginBottom afNoGutter>
					{job?.application_details.email && (
						<>
							<div
								style={{
									display: "flex",
									gap: "0.5rem",
								}}
							>
								<DigiIconAt style={{ width: "18px", height: "18px" }} />
								<h3>Ansök via mejl</h3>
							</div>
							<span>Mejla din ansökan till </span>
							<DigiLink af-href={`mailto:${job.application_details.email}`}>
								{job.application_details.email}
							</DigiLink>
						</>
					)}
				</DigiLayoutContainer>
				<DigiLayoutContainer afNoGutter>
					{job?.application_details.reference && (
						<p>
							Ange referens <strong>{job?.application_details.reference}</strong> i
							din ansökan
						</p>
					)}
				</DigiLayoutContainer>
			</DigiLayoutBlock>
		</>
	);
};
