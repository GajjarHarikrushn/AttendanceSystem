import { useEffect, useState } from "react"
import { auth, db } from "./firebase"
import { get, ref } from "firebase/database"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/login"
import User from "./pages/user"
import Admin from "./pages/admin"

export default function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null)
        setLoading(false)
        return
      }

      const snapshot = await get(ref(db, `users/${firebaseUser.uid}`))
      const data = snapshot.val()

      setUser({
        ...firebaseUser,
        ...data
      })
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <Routes>
      {!user && (
        <Route path="*" element={<Login />} />
      )}

      {user && user?.role === "admin" && (
        <>
          <Route
            path="/admin/*"
            element={
              <Admin
                user={user}
                onLogout={() => signOut(auth)}
              />
            }
          />
          <Route path="*" element={<Navigate to="/admin" />} />
        </>
      )}

      {user && user?.role === "user" && (
        <>
          <Route
            path="/user/*"
            element={
              <User
                user={user}
                onLogout={() => signOut(auth)}
              />
            }
          />
          <Route path="*" element={<Navigate to="/user" />} />
        </>
      )}
    </Routes>
  )
}