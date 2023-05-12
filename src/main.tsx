import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {PollResultPage} from "./pages/PollResultPage";
import PollSurveyPage from "./pages/PollSurveyPage";
import PollEditorPage from "./pages/PollEditorPage";
import PollsListingPage from "./pages/PollsListingPage";
import {Navbar} from "../components/Navbar";
import {SessionTools} from "../lib/Types";
import {useSession} from "../lib/hooks";
import {LoginPage} from "./pages/LoginPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout protect={true}/>,
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
        ]
    },
    {
        path: "/auth",
        element: <Layout protect={false}/>,
        children: [
            {
                path: "",
                element: <LoginPage/>
            }
        ]
    },
    {
        path: ":pollId",
        element: <PollSurveyPage/>
    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)

export const UserContext = createContext<SessionTools>({
    currentSession: null
})

export default function Layout({protect}: { protect: boolean }) {
    const session = useSession()
    return <>
    <div className="outer">
        <UserContext.Provider value={session}>
                <Navbar/>
                {
                    !protect || session.currentSession?.user ? <main className="main-body"><Outlet/></main> :
                        <h1 className="request">Please sign in! 😄</h1>
                }
        </UserContext.Provider>
    </div>
    </>
}
