import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../firebase";
import "./login.css";

function buildUserData(
  email: string,
  firstName: string,
  lastName: string
) {
  return {
    email,
    role: "user",
    firstName,
    lastName,
    createdAt: Date.now()
  };
}

function Login() {
  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to login. Please check your credentials.");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      await set(
        ref(db, `users/${user.uid}`),
        buildUserData(user.email!, firstName, lastName)
      );

      setError("");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="login">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>

      <form
        onSubmit={isSignup ? handleSignup : handleLogin}
        className="form"
      >
        {isSignup && (
          <>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">
          {isSignup ? "Create Account" : "Login"}
        </button>

        <button
          type="button"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Login"
            : "Need an account? Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Login;
