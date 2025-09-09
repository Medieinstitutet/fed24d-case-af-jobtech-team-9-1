import { useEffect, useState } from "react";
import "./App.css";
import { getJobs } from "./services/jobServices";

function App() {
	// const [loading, setLoading] = useState(true);
	const [jobs, setJobs] = useState([]);

	// useEffect(
	// 	() =>
	// 		async function fetchJobs() {
	// 			try {
	// 				const data: [] = await getJobs();
	// 				console.log(data);
	// 			} catch (error) {
	// 				console.error("failed to fetch jobs", error);
	// 			} finally {
	// 				setLoading(false);
	// 			}
	// 			if ([].length === 0) {
	// 				fetchJobs();
	// 			} else {
	// 				setLoading(false);
	// 			}
	// 		}
	// );

  useEffect(() => {
    const getData = async () => {
      const data = await getJobs();
      setJobs(data);
    };
 
    if (jobs.length > 0) return;

    getData();
  });


	return (
		<>
			<h1>TEST</h1>
		</>
	);
}

export default App;
