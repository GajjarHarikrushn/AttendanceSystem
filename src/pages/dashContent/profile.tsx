import "./profile.css";
import { useState } from "react";
import ProfilePicture from "../components/profilePicture";
import { Mail, MapPinHouse, Phone, TrendingUp } from "lucide-react";

export default function Profile({user}: any) {
    const [ present, setPresent ] = useState(0);
    const [ Late, setLate ] = useState(0);
    const [ absent, setAbsent ] = useState(0);
    const [ excused, setExcused ] = useState(0);

    return (
        <div className="profile">
            <div className="profile-info">
                <ProfilePicture
                    fontcolor="black"
                    backcolor="white"
                    pSize={46}
                    dimention="75px"
                />
                <br/>
                <p>{user.firstName} {user.lastName}</p>
                <p>{user.role}</p>
            </div>

            <div className="profile-stats">
                <div className="stat">
                    <p style={{fontWeight:"bold", fontSize:"1.3rem", color:"#00ff00"}}>{present}</p>
                    <p>Present</p>
                </div>
                <div className="stat">
                    <p style={{fontWeight:"bold", fontSize:"1.3rem", color:"orange"}}>{Late}</p>
                    <p>Late</p>
                </div>
                <div className="stat">
                    <p style={{fontWeight:"bold", fontSize:"1.3rem", color:"#ff0000"}}>{absent}</p>
                    <p>Absent</p>
                </div>
                <div className="stat">
                    <p style={{fontWeight:"bold", fontSize:"1.3rem", color:"#00ffff"}}>{excused}</p>
                    <p>Excused</p>
                </div>
            </div>

            {attandanceBar(present)}
            {contactInfo(user)}
            {recentAttendance(user)}
        </div>
    )
}

function attandanceBar(attend: number) {
    return (
        <div className="attandance-section">
            <div className="attandance-label">
                <div>
                    <TrendingUp size={24} color="white"/>
                    <p style={{fontWeight:"bold"}}>Attendance</p>
                </div>
                <p>{attend}%</p>
            </div>
            <div className="attandance-bar">
                <div className="attandance-fill" style={{
                    width: `${attend}%`,
                    height: "100%",
                    backgroundColor: attend >= 75 ? "#00ff00" : attend >= 50 ? "orange" : "red",
                }}></div>
            </div>
        </div>
    )
}

function contactInfo(user: any) {
    return (
        <div className="contact-info">
            <p style={{fontWeight:"bold", fontSize:"1.3rem", width: "80%"}}>Contact Information</p>
            <div className="contact-list">
                <div className="contact-item">
                    <Mail size={16} />
                    <p>{user.email ? user.email : "Not provided"}</p>
                </div>
                <div className="contact-item">
                    <Phone size={16} />
                    <p>{user.phone ? user.phone : "Not provided"}</p>
                </div>
                <div className="contact-item">
                    <MapPinHouse size={16} />
                    <p>{user.address ? user.address : "Not provided"}</p>
                </div>
            </div>
        </div>
    )
}

function recentAttendance(user: any) {
    return (
        <div className="recent-attendance">
            <p style={{fontWeight:"bold", fontSize:"1.3rem"}}>Recent Attendance</p>
            {/* Recent attendance content would go here */}
        </div>
    )
}
