import "./profile.css";

export default function Profile({user}: any) {
    return (
        <div className="profile">
            <div className="profileCard">
                <h2>Your Profile</h2>
                <div className="profileHeader">
                    <div className="profilePicture">
                        {user.firstName && user.lastName ? (
                            <span>{user.firstName[0].toUpperCase()}{user.lastName[0].toUpperCase()}</span>
                        ) : (
                            <span>{user.email[0].toUpperCase()}</span>
                        )}
                    </div>
                    <div className="profileName">
                        <h2>{user.firstName} {user.lastName}</h2>
                        <h4>{user.role}</h4>
                    </div>
                </div>
                <div className="profileDetails">
                    <h3>Email:</h3>
                    <p>{user.email}</p>

                    <h3>First Name:</h3>
                    {user.firstName ? <p>{user.firstName}</p> : <p>Not set</p>}

                    <h3>Last Name:</h3>
                    {user.lastName ? <p>{user.lastName}</p> : <p>Not set</p>}
                </div>
            </div>
        </div>
    )
}