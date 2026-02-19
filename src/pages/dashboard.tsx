import { useEffect, useState } from "react"
import { get, ref } from "firebase/database"
import Admin from "./admin"
import User from "./user"
import { db } from "../firebase"
import "./dashboard.css"

function Dashboard({ user, onLogout }: { user: any; onLogout: () => void }) {

  const [role, setRole] = useState<string | null>(null)
  const [name, setName] = useState<Array<string>>([])

  useEffect(() => {
    async function fetchRole() {
      const snapshot = await get(ref(db, `users/${user.uid}`))
      const data = snapshot.val()
      setRole(data?.role || "user")
      setName([data?.firstName || "", data?.lastName || ""])
    }

    if (user?.uid) {
      fetchRole()
    }
  }, [user])

  if (!role) return <div>Loading...</div>

  const panel = role === "admin" ? <Admin user={user} /> : <User user={user} />

  return (
    <div>
      <div className="topBar">
        <h2>Welcome, {name[0]} {name[1] || user.email}!</h2>
        <button onClick={onLogout}>Logout</button>
      </div>
      {panel}
    </div>
  )
}

export default Dashboard
