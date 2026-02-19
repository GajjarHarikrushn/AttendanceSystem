import Profile from "./profile";

export default function User(user: any) {
    return (
        <div>
            <Profile profile={{email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName}} />
        </div>
    )
}