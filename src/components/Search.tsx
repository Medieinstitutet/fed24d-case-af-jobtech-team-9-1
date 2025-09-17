import { useState, useContext, type FormEvent } from "react";
import { JobContext } from "../context/JobContext";
import { JobActionType } from "../reducers/JobReducer";
import { DigiFormInputSearch } from "@digi/arbetsformedlingen-react";
import { FormInputSearchVariation, FormInputType } from "@digi/arbetsformedlingen";
import { getSuggestions } from "../services/suggestionService";
import type { Suggestions, SuggestionsResponse } from "../models/Suggestions";
import { SuggestionsList } from "./SuggestionsList";

export const Search = () => {
	const [input, setInput] = useState("");
	const [suggestions, setSuggestions] = useState<Suggestions[]>([]);
	const [activeIndex, setActiveIndex] = useState<number>(-1);

	const { dispatch } = useContext(JobContext);

	// ON CHANGE
	const handleChange = async (e: CustomEvent) => {
		const target = e.target as HTMLInputElement;
		const value = target.value;

		setInput(value);
		setActiveIndex(-1);

		if (value.length > 0) {
			const result: SuggestionsResponse = await getSuggestions(value);
			setSuggestions(result.typeahead);
		} else {
			setSuggestions([]);
		}
	};

	// ON KEY DOWN (arrow + enter)
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (suggestions.length === 0) return;

		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
		}

		if (e.key === "ArrowUp") {
			e.preventDefault();
			setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
		}

		if (e.key === "Enter" && activeIndex >= 0) {
			e.preventDefault();
			handleSelect(suggestions[activeIndex].value);
		}
	};

	// SELECT suggestion
	const handleSelect = (value: string) => {
		setInput(value);
		setSuggestions([]);
		setActiveIndex(-1);
	};

	// ON SUBMIT
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch({
			type: JobActionType.SET_SEARCH,
			payload: input,
		});
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<DigiFormInputSearch
					afLabel="Hitta lediga jobb"
					afVariation={FormInputSearchVariation.MEDIUM}
					afType={FormInputType.SEARCH}
					afButtonText="Sök"
					value={input}
					onAfOnInput={handleChange}
					onKeyDown={handleKeyDown} //  listen for arrows/enter
					className="search-custom"
				/>
			</form>
			{suggestions.length > 0 && input.length > 0 && (
				<SuggestionsList
					suggestions={suggestions}
					activeIndex={activeIndex}
					onSelect={handleSelect}
				/>
			)}
		</>
	);
};
