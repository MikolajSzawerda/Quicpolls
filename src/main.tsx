import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {PollResultPage} from "./pages/PollResultPage";
import PollSurveyPage from "./pages/PollSurveyPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world!</div>,
    },
    {
        path: "/polls/:pollId",
        element: <PollResultPage/>
    },
    {
        path: "/:pollId",
        element: <PollSurveyPage/>
    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)