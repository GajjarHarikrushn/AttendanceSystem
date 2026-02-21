// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/web-extension";
import { get, getDatabase, ref, remove, update } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDDWO7ko17hSm_BDJJu5ip7OMVP7AU1Nc",
  authDomain: "testing-d0b99.firebaseapp.com",
  projectId: "testing-d0b99",
  storageBucket: "testing-d0b99.firebasestorage.app",
  messagingSenderId: "994831965323",
  appId: "1:994831965323:web:57c9fc7a64af809012088e",
  measurementId: "G-GBGVXKEBM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { db };
export { auth };
export { app };

export function getData({user}: any) {
  if(user.role === "admin") {
    const data = get(ref(db, `users`)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    return data;
  }
  else {
    const data = get(ref(db, `users/${user.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    return data;
  }
}

export async function deleteUserData(user: any, uid: string) {
  if(user.role === "admin") {
    get(ref(db, `users/${user.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        remove(ref(db, `users/${uid}`));
      }
    }).catch((error) => {
      console.error("Error deleting user:", error);
      return Promise.reject(error);
    });
  }
}

export async function editUserData(user: any, uid: string, updates: { [key: string]: any }) {
  if(user.role === "admin") {
    try {
      const userRef = ref(db, `users/${uid}`);

      await update(userRef, updates);
    } catch (error) {
      console.error(`Error updating user data for UID ${uid}:`, error);
    }
  } else {
    alert("You do not have permission to edit user data.");
  }
}