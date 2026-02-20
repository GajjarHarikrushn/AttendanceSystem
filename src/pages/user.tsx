import Profile from "./profile";

export default function User(user: any) {
    return (
        <div>
            <Profile profile={user} />
        </div>
    )
}