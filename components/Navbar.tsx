import {useNavigate} from "react-router-dom";
import {UserContext} from "../src/main";
import React from "react";

export const Navbar = () => {
    const navigate = useNavigate()
    const session = React.useContext(UserContext)
    return <nav className="nav-bar">
        <div className="nav-header">Quicpolls</div>
        <div className="nav-action-buttons">
            {session.logged ? <>
                <div className="nav-item" onClick={() => navigate("/edit")}>Add new poll</div>
                <div className="nav-item" onClick={() => navigate("/polls")}>My polls</div>
                <div className="nav-item" onClick={session.logOut}>Log out</div>
            </> : <>
                <div className="nav-item" onClick={session.logIn}>Log in</div>
                <div className="nav-item">Sing in</div>
            </>

            }

        </div>
    </nav>
}