import Profile from "./profile"
import "./admin.css"
import { use, useState } from "react";

export default function Admin({user}: any) {
    const [tab, setTab] = useState("dashboard");

    return (
        <div className="admin">
            <div className="sidebar">
                <p onClick={() => setTab("dashboard")}>Dashboard</p>
                <p onClick={() => setTab("database")}>Database</p>
                <p onClick={() => setTab("reports")}>Reports</p>
                <p onClick={() => setTab("settings")}>Settings</p>
            </div>
            {tab === "dashboard" && <Profile profile={user} />}
            {tab === "database" && <h1>Database Management</h1>}
            {tab === "reports" && <h1>Reports</h1>}
            {tab === "settings" && <h1>Settings</h1>}
        </div>
    )
}