// import { createContext, useContext, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

// const AuthContext = createContext();

// // check token validity
// const getStoredUser = () => {
//   try {
//     const user = localStorage.getItem("user");
//     if (!user) return null;

//     const parsedUser = JSON.parse(user);

//     if (!parsedUser?.token) return null;

//     const decoded = jwtDecode(parsedUser.token);

//     // check expiry (exp is in seconds)
//     if (decoded.exp * 1000 < Date.now()) {
//       localStorage.removeItem("user");
//       return null;
//     }

//     return parsedUser;
//   } catch (error) {
//     console.error("Error parsing/validating user:", error);
//     localStorage.removeItem("user");
//     return null;
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(getStoredUser);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   // OPTIONAL: auto logout when token expires while app is open
//   useEffect(() => {
//     if (!user?.token) return;

//     const decoded = jwtDecode(user.token);
//     const timeLeft = decoded.exp * 1000 - Date.now();

//     const timer = setTimeout(() => {
//       logout();
//     }, timeLeft);

//     return () => clearTimeout(timer);
//   }, [user]);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error("useAuth must be used inside AuthProvider");
//   }

//   return context;
// };

// src/Pages/AuthContext.jsx
//
// Merged auth context — combines:
//  • JWT-based session validation, expiry check, and auto-logout-on-expiry
//    timer (from the original Pages/AuthContext.jsx)
//  • Email/password API login (from the old context/AuthContext.jsx)
//
// Storage: single localStorage key "user" holding { ...recruiterFields, token }
// (matches the original Pages/AuthContext.jsx scheme — the old app's separate
// "asliya_admin_token" / "asliya_admin_user" keys are retired).
//
// useAuth() returns { user, login, logout, loading }.
//   - login(userData)        -> stores an already-resolved user object as-is
//   - login(email, password) -> calls POST /auth/login, stores the result
// Both call styles are supported so neither app's existing Login page needs
// to change.// src/Pages/AuthContext.jsx
//
// Merged auth context — combines:
//  • JWT-based session validation, expiry check, and auto-logout-on-expiry
//    timer (from the original Pages/AuthContext.jsx)
//  • Email/password API login (from the old context/AuthContext.jsx)
//
// Storage: single localStorage key "user" holding { ...recruiterFields, token }
// (matches the original Pages/AuthContext.jsx scheme — the old app's separate
// "asliya_admin_token" / "asliya_admin_user" keys are retired).
//
// useAuth() returns { user, login, logout, loading }.
//   - login(userData)        -> stores an already-resolved user object as-is
//   - login(email, password) -> calls POST /auth/login, stores the result
// Both call styles are supported so neither app's existing Login page needs
// to change.
// src/Pages/AuthContext.jsx
//
// Merged auth context — combines:
//  • JWT-based session validation, expiry check, and auto-logout-on-expiry
//    timer (from the original Pages/AuthContext.jsx)
//  • Email/password API login (from the old context/AuthContext.jsx)
//
// Storage: single localStorage key "user" holding { ...recruiterFields, token }
// (matches the original Pages/AuthContext.jsx scheme — the old app's separate
// "asliya_admin_token" / "asliya_admin_user" keys are retired).
//
// useAuth() returns { user, login, logout, loading }.
//   - login(userData)        -> stores an already-resolved user object as-is
//   - login(email, password) -> calls POST /admin/login, stores the result
// Both call styles are supported so neither app's existing Login page needs
// to change.

import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios.js";

const AuthContext = createContext();

// ── Read + validate whatever's in localStorage on boot ──────────────────────
const getStoredUser = () => {
  try {
    const stored = localStorage.getItem("user");
    if (!stored) return null;

    const parsedUser = JSON.parse(stored);
    if (!parsedUser?.token) return null;

    const decoded = jwtDecode(parsedUser.token);

    // exp is in seconds, Date.now() is in ms
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("user");
      return null;
    }

    return parsedUser;
  } catch (error) {
    console.error("Error parsing/validating user:", error);
    localStorage.removeItem("user");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);

  // Kept for interface parity with the old context (which had an async
  // restore step). Restoration here is synchronous via lazy useState, so
  // this never actually blocks anything — it's here only in case any
  // component destructures `loading` from useAuth().
  const [loading] = useState(false);

  // ── login ───────────────────────────────────────────────────────────────
  // Two supported call styles:
  //   login(userData)          e.g. login({ _id, name, role, token })
  //   login(email, password)   hits the backend and stores the response
  const login = async (emailOrUserData, password) => {
    let userData;

    if (typeof emailOrUserData === "string" && password !== undefined) {
      // login(email, password) — calls the real admin login endpoint
      const { data } = await api.post("/admin/login", {
        email: emailOrUserData,
        password,
      });

      // Backend (adminAuthController.Adminlogin) responds with
      // { success, token, user: { _id, name, email, role } }.
      // Flatten so user.token / user._id / user.name / user.role all work
      // directly off the context's `user` object.
      const { token, user } = data;
      userData = { ...user, token };
    } else {
      // login(userData) — already-resolved object, original flow
      userData = emailOrUserData;
    }

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ── Auto-logout when token expires while the app is open ────────────────
  useEffect(() => {
    if (!user?.token) return;

    let decoded;
    try {
      decoded = jwtDecode(user.token);
    } catch {
      logout();
      return;
    }

    const timeLeft = decoded.exp * 1000 - Date.now();
    if (timeLeft <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(() => {
      logout();
    }, timeLeft);

    return () => clearTimeout(timer);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};