import { useEffect, useState } from "react"
import { auth, db } from "./firebase"
import { get, ref } from "firebase/database"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { Route, Routes, useNavigate, Navigate } from "react-router"
import Login from "./pages/login"
import User from "./pages/user"
import Admin from "./pages/admin"

export default function App() {
  const [user, setUser] = useState(auth.currentUser)
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)

      if (!firebaseUser) return

      const snapshot = await get(ref(db, `users/${firebaseUser.uid}`))
      const data = snapshot.val()
      setPerson(data)
    })

    return () => unsubscribe()
  }, [navigate])

  if (loading || (user && !person)) {
    return <p>Loading...</p>
  }

  return (
    <Routes>
      {!user && (
        <Route path="*" element={<Login />} />
      )}

      {user && person?.role === "admin" && (
        <>
          <Route path="/admin/*" element={
            <Admin user={person} onLogout={() => { signOut(auth); navigate("/"); }} />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </>
      )}

      {user && person?.role === "user" && (
        <>
          <Route path="/user/*" element={
            <User user={person} onLogout={() => { signOut(auth); navigate("/"); }} />} />
          <Route path="*" element={<Navigate to="/user" />} />
        </>
      )}
    </Routes>
  );
}
