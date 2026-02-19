export default function Profile({profile}: {profile: {email: string, role: string, firstName?: string, lastName?: string}}) {
    return (
        <div>
            <h4>Your Profile</h4>
            <p>Email: {profile.email}</p>
            <p>Role: {profile.role}</p>
            {profile.firstName && <p>First Name: {profile.firstName}</p>}
            {profile.lastName && <p>Last Name: {profile.lastName}</p>}
        </div>
    )
}