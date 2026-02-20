import { useEffect, useState } from "react"
import { get, ref } from "firebase/database"
import Admin from "./admin"
import User from "./user"
import { db } from "../firebase"
import "./dashboard.css"

function Dashboard({ user, onLogout }: { user: any; onLogout: () => void }) {

  const [person, setPerson] = useState<any>(null) // person will contain firstName, lastName, email, role

  useEffect(() => {
    async function fetchProfile() {
      if (!user?.uid) return
      const snapshot = await get(ref(db, `users/${user.uid}`))
      const data = snapshot.val()
      if (data) setPerson(data)
    }

    fetchProfile()
  }, [user])

  if (!person) return <h1>Loading...</h1>

  const panel = person.role === "admin" ? <Admin user={person} /> : <User user={person} />

  return (
    <div>
      <div className="topBar">
        <h2>Welcome, {person.firstName && person.lastName ? `${person.firstName} ${person.lastName}` : person.email}!</h2>
        <button onClick={onLogout}>Logout</button>
      </div>
      <div className="dashboardContent">
        {panel}
      </div>
    </div>
  )
}

export default Dashboard
