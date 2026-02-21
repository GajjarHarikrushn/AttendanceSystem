import Profile from "./dashContent/profile"
import Settings from "./dashContent/settings"
import Database from "./dashContent/database"
import Reports from "./dashContent/reports"
import { Route, Routes, useNavigate } from "react-router-dom"
import "./userAdmin.css"

export default function Admin({ user, onLogout }: { user: any; onLogout: () => void }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="topBar">
                <h2>Welcome, {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email}!</h2>
                <button onClick={onLogout}>Logout</button>
            </div>
            <div className="user">
                <div className="sidebar">
                    <p onClick={() => navigate("/admin/profile")}>Profile</p>
                    <p onClick={() => navigate("/admin/database")}>Database</p>
                    <p onClick={() => navigate("/admin/reports")}>Reports</p>
                    <p onClick={() => navigate("/admin/settings")}>Settings</p>
                </div>
                <Routes>
                    <Route index element={<Profile user={user} />} />
                    <Route path="profile" element={<Profile user={user} />} />
                    <Route path="database" element={<Database user={user} />} />
                    <Route path="reports" element={<Reports user={user} />} />
                    <Route path="settings" element={<Settings user={user} />} />
                </Routes>
            </div>
        </>
    )
}