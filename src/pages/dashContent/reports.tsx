import "./reports.css";

export default function Profile({user}: any) {
    return (
        <div className="reports">
            <h2>Your Profile</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            {user.firstName && <p>First Name: {user.firstName}</p>}
            {user.lastName && <p>Last Name: {user.lastName}</p>}
        </div>
    )
}