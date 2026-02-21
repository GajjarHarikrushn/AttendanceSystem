import Profile from "./dashContent/profile";
import Settings from "./dashContent/settings";
import { useState } from "react";

export default function User({user}: any) {
    const [tab, setTab] = useState("dashboard");

    return (
        <div className="admin">
            <div className="sidebar">
                <p onClick={() => setTab("dashboard")}>Dashboard</p>
                <p onClick={() => setTab("settings")}>Settings</p>
            </div>
            {tab === "dashboard" && <Profile user={{...user}} />}
            {tab === "settings" && <Settings user={{...user}} />}
        </div>
    )
}