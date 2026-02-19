import Profile from "./profile"

export default function Admin(user: any) {
    return (
        <div>
            <Profile profile={{email: user.email, role: user.role}} />
        </div>
    )
}