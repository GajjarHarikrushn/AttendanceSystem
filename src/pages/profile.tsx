import "./profile.css";

export default function Profile({profile}: any) {
  console.log("Admin prop:", profile);
    return (
        <div className="profile">
            <h2>Your Profile</h2>
            <p>Email: {profile.email}</p>
            <p>Role: {profile.role}</p>
            {profile.firstName && <p>First Name: {profile.firstName}</p>}
            {profile.lastName && <p>Last Name: {profile.lastName}</p>}
        </div>
    )
}