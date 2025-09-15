import { LayoutContainerVariation, ListType } from "@digi/arbetsformedlingen";
import { DigiLayoutContainer, DigiList } from "@digi/arbetsformedlingen-react";
import type { Concept, Job, Requirements } from "../models/Job";

interface QualificationsProps {
	job: Job | undefined;
}

type RequirementKey = keyof Requirements;

interface Category {
	key: RequirementKey;
	label: string;
}

export const Qualifications = ({ job }: QualificationsProps) => {
	if (!job) return null;

	const categories: Category[] = [
		{ key: "work_experiences", label: "Arbetslivserfarenhet" },
		{ key: "skills", label: "Kompetenser" },
		{ key: "languages", label: "Språk" },
		{ key: "education", label: "Utbildning" },
		{ key: "education_level", label: "Utbildningsnivå" },
	];

	const renderList = (items: Concept[] | undefined, title: string, key: string) => {
		if (!items || items.length === 0) return null;
		return (
			<div key={key}>
				<h3>{title}</h3>
				<DigiList afListType={ListType.BULLET}>
					{items.map((item, i) => (
						<li key={i}>{item.label}</li>
					))}
				</DigiList>
			</div>
		);
	};

	const kravContent = categories.map((c) =>
		renderList(job.must_have?.[c.key], `${c.label} - Krav`, `must-${c.key}`)
	);

	const meriterandeContent = categories.map((c) =>
		renderList(job.nice_to_have?.[c.key], `${c.label} - Meriterande`, `nice-${c.key}`)
	);

	const hasAny = kravContent.some(Boolean) || meriterandeContent.some(Boolean);

	if (!hasAny) return null;

	return (
		<DigiLayoutContainer afVariation={LayoutContainerVariation.STATIC} afVerticalPadding>
			<h2>Kvalifikationer</h2>
			{kravContent}
			{meriterandeContent}
		</DigiLayoutContainer>
	);
};
