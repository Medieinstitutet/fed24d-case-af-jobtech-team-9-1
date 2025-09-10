import { useState, type ChangeEvent, type FormEvent } from "react";
import { getJobs } from "../services/jobServices";

export const Search = () => {
	const [searchWord, setSearchWord] = useState("");

  // ON CHANGE
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchWord(e.target.value);
	};

  // ON SUBMIT
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
    getJobs(searchWord)
	};

	console.log(searchWord);

	return (
		<>
			<h1>Search</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="sök" value={searchWord} onChange={handleChange} />
				<button>Sök</button>
			</form>
		</>
	);
};
