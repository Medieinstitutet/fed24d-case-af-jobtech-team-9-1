import { Outlet } from "react-router"
import { JobContext } from "../context/JobContext"
import { useReducer } from "react";
import { JobReducer } from "../reducers/JobReducer";

export const Layout = () => {
      const [jobs, dispatch] = useReducer(JobReducer); // FIX - Add  initial state
    return<>
    <JobContext.Provider value={{jobs, dispatch}}>
        <header>Header</header>
        <main>
            <Outlet/>
        </main>
        <footer>Footer</footer>
        </JobContext.Provider>
    </>
}