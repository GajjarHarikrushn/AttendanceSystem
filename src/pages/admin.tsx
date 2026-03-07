import Profile from "./dashContent/profile"
import Settings from "./dashContent/settings"
import Database from "./dashContent/database"
import Reports from "./dashContent/reports"
import { Route, Routes, useNavigate, NavLink } from "react-router-dom"
import "./userAdmin.css"
import ProfilePicture from "./components/profilePicture"
import { ChartNoAxesColumn, Database as DatabaseIcon, User, Settings as SettingsIcon, LogOut } from "lucide-react"

export default function Admin({ user, onLogout }: { user: any; onLogout: () => void }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="user">
                <div className="sidebar">
                    <div className="user-info">
                        <ProfilePicture fontcolor="black" backcolor="white" pSize={32} />
                        <h2>{user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email}</h2>
                    </div>
                    <div className="nav">
                        <NavLink to={"/admin/profile"} className="nav-item">
                            <User size={20} />
                            Profile
                        </NavLink>
                        <NavLink to={"/admin/database"} className="nav-item">
                            <DatabaseIcon size={20} />
                            Database
                        </NavLink>
                        <NavLink to={"/admin/reports"} className="nav-item">
                            <ChartNoAxesColumn size={20} />
                            Reports
                        </NavLink>
                        <NavLink to={"/admin/settings"} className="nav-item">
                            <SettingsIcon size={20} />
                            Settings
                        </NavLink>
                    </div>
                    <button onClick={onLogout} className="nav-item">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
                <div className="rightBar">
                    <Routes>
                        <Route index element={<Profile user={user} />} />
                        <Route path="profile" element={<Profile user={user} />} />
                        <Route path="database" element={<Database user={user} />} />
                        <Route path="reports" element={<Reports user={user} />} />
                        <Route path="settings" element={<Settings user={user} />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}