import {useNavigate} from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate()
    return <nav className="nav-bar">
        <div className="nav-header">Quicpolls</div>
        <div className="nav-action-buttons">
            <div className="nav-item" onClick={()=>navigate("/edit")}>Add new poll</div>
            <div className="nav-item" onClick={()=>navigate("/polls")}>My polls</div>
            <div className="nav-item">Log out</div>
        </div>
    </nav>
}