import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { JobDetails } from "./pages/JobDetails";
import { Error } from "./pages/Error";

export const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <Error/>,
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/job/:id',
                element: <JobDetails/>
            }
        ]
    }
])