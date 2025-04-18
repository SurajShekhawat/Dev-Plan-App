import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import {
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// ✅ Exported AuthContext so it can be imported elsewhere
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set persistence to local so user stays logged in even after page refresh
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });

        return () => unsubscribe();
      })
      .catch((error) => {
        console.error("Persistence error:", error);
        setLoading(false);
      });
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ currentUser: user, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ✅ useAuth hook for cleaner context usage
export const useAuth = () => useContext(AuthContext);
