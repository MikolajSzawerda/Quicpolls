import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {PollResultPage} from "./pages/PollResultPage";
import PollSurveyPage from "./pages/PollSurveyPage";
import PollEditorPage from "./pages/PollEditorPage";
import PollsListingPage from "./pages/PollsListingPage";
import {Navbar} from "../components/Navbar";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "edit",
                element: <PollEditorPage/>
            },
            {
                path: "polls",
                element: <PollsListingPage/>,
            },
            {
                path: "polls/:pollId",
                element: <PollResultPage/>
            },
            {
                path: ":pollId",
                element: <PollSurveyPage/>
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)

export default function Layout() {
    return <>
        <Navbar/>
            <Outlet/>
    </>
}
