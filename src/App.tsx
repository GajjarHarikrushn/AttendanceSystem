import { useEffect, useState } from "react"
import { auth } from "./firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"

export default function App() {
  const [user, setUser] = useState(auth.currentUser)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    user ? 
      <Dashboard user={user} onLogout={() => signOut(auth)} />
      :
      <Login />
  )
}
