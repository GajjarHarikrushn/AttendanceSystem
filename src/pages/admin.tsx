import Profile from "./dashContent/profile"
import Settings from "./dashContent/settings"
import Database from "./dashContent/database"
import Reports from "./dashContent/reports"

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
            {tab === "dashboard" && <Profile user={{...user}} />}
            {tab === "database" && <Database user={{...user}} />}
            {tab === "reports" && <Reports user={{...user}} />}
            {tab === "settings" && <Settings user={{...user}} />}
        </div>
    )
}