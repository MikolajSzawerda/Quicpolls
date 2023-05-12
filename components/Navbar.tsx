import {useNavigate} from "react-router-dom";
import {UserContext} from "../src/main";
import "./Navbar.css";
import {useContext} from "react";
export const Navbar = () => {
    const navigate = useNavigate()
    const session = useContext(UserContext)

    const navigateToLogin = (mode: "sign_in" | "sign_up") => {
        navigate("/auth", {state: {mode: mode}})
    }

    return <header>
        <nav className="nav-bar">
        <div className="nav-header">Quicpolls</div>
        <div className="nav-action-buttons">
            {session.currentSession?.user ? <>
                <div className="nav-item" onClick={() => navigate("/edit")}>Add new poll</div>
                <div className="nav-item" onClick={() => navigate("/polls")}>My polls</div>
                <div className="nav-item" onClick={session.logOut}>Log out</div>
            </> : <>
                <div className="nav-item" onClick={()=>navigateToLogin("sign_in")}>Sign in</div>
                <div className="nav-item" onClick={()=>navigateToLogin("sign_up")}>Sign up</div>
            </>

            }
        </div>
    </nav>
    </header>
}