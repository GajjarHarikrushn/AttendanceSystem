import Profile from "./dashContent/profile";
import Settings from "./dashContent/settings";
import "./userAdmin.css"
import { Route, Routes, useNavigate } from "react-router-dom";

export default function User({ user, onLogout }: { user: any; onLogout: () => void }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="topBar">
                <h2>Welcome, {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email}!</h2>
                <button onClick={onLogout}>Logout</button>
            </div>
            <div className="user">
                <div className="sidebar">
                    <p onClick={() => navigate("/user/profile")}>Profile</p>
                    <p onClick={() => navigate("/user/settings")}>Settings</p>
                </div>
                <Routes>
                    <Route index element={<Profile user={user} />} />
                    <Route path="profile" element={<Profile user={{...user}} />} />
                    <Route path="settings" element={<Settings user={{...user}} />} />
                </Routes>
            </div>
        </>
    )
}