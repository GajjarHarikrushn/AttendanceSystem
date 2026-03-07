import ProfilePicture from "./components/profilePicture";
import Profile from "./dashContent/profile";
import Settings from "./dashContent/settings";
import "./userAdmin.css"
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

export default function User({ user, onLogout }: { user: any; onLogout: () => void }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="user">
                <div className="sidebar">
                    <div className="user-info">
                        <ProfilePicture fontcolor="black" backcolor="white" pSize={32}/>
                        <h2>{user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email}</h2>
                    </div>
                    <div className="nav">
                        <NavLink to={"/admin/profile"}>Profile</NavLink>
                        <NavLink to={"/admin/database"}>Database</NavLink>
                        <NavLink to={"/admin/reports"}>Reports</NavLink>
                        <NavLink to={"/admin/settings"}>Settings</NavLink>
                    </div>
                    <button onClick={onLogout}>Logout</button>
                </div>
                <div className="rightBar">
                    <Routes>
                        <Route index element={<Profile user={user} />} />
                        <Route path="profile" element={<Profile user={user} />} />
                        <Route path="settings" element={<Settings user={user} />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}