// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Pages/AuthContext";
// import { Zap, Loader2, Lock, Mail, Eye, EyeOff } from "lucide-react";
// import axios from "../api/axios.js";
// import logo from "../assets/logo.png";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     if (!email || !password) {
//       setError("Please enter both credentials.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post("/admin/login", { email, password });
//       const { token, admin } = response.data;
      
//       // Ideally, use HttpOnly cookies for tokens; 
//       // if using localStorage, ensure your site has a strict CSP.
//       localStorage.setItem("token", token);
      
//       login(admin);
//       navigate("/");
//     } catch (err) {
//       if (!err.response) {
//         setError("Unable to connect to server. Please check your internet.");
//       } else if (err.response.status === 401) {
//         setError("Invalid email or password.");
//       } else {
//         setError(err.response?.data?.message || "Login failed. Please try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
//       <div className="w-full max-w-md">
//        <div className="text-center mb-10">
//   <div className="mx-auto w-16 h-16  rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20 mb-6">
//     <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
//   </div>

//   <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
//     Welcome back
//   </h1>
  
//   <p className="text-slate-500 mt-2">
//     Sign in to your Asliya Recruitment admin dashboard
//   </p>
// </div>

//         <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50">
//           <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//             {error && (
//               <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3 text-center">
//                 {error}
//               </div>
//             )}

//             <div className="flex flex-col gap-2">
//               <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider" htmlFor="email">Email</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
//                 <input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-none"
//                   placeholder="admin@mainpower.com"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col gap-2">
//               <div className="flex justify-between items-center">
//                 <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider" htmlFor="password">Password</label>
//                 <a href="/forgot-password" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">Forgot?</a>
//               </div>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-none"
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
//                 >
//                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
//             </div>

//             <button 
//               disabled={isLoading}
//               type="submit" 
//               className="w-full mt-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 active:scale-[0.98]"
//             >
//               {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Sign in to Portal"}
//             </button>
//           </form>
//         </div>

//         <p className="mt-8 text-center text-xs text-slate-400">
//           © 2026 Mainpower. Secure Admin Access.
//         </p>
//       </div>
//     </div>
//   );
// }

// src/Pages/Login.jsx
//
// Merged login page — keeps the polished UI from the canonical
// Pages/Login.jsx (logo, indigo theme, password show/hide, forgot-password
// link, layered error messages), but the actual sign-in call now goes
// through AuthContext's login(email, password) — same pattern the old
// chat app's Login.jsx used — instead of calling axios and storing the
// token in the component. This removes the previous inconsistency where
// the token was stored under a separate "token" key while the rest of the
// app expects it embedded in the single "user" key.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Pages/AuthContext";
import { Loader2, Lock, Mail, Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both credentials.");
      return;
    }

    setIsLoading(true);
    try {
      // Delegates to AuthContext, which calls POST /admin/login and stores
      // { ...admin, token } under the single "user" localStorage key — this
      // keeps the persisted session consistent across reloads and lets the
      // auto-logout-on-expiry timer work correctly.
      await login(email, password);
      navigate("/");
    } catch (err) {
      if (!err.response) {
        setError("Unable to connect to server. Please check your internet.");
      } else if (err.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError(err.response?.data?.message || "Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          {/* <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20 mb-6">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          </div> */}
     <img src={logo} alt="Logo" className="w-36 h-32 object-contain mx-auto mb-1" />

          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back
          </h1>

          <p className="text-slate-500 mt-2">
            Sign in to your Asliya Recruitment admin dashboard
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3 text-center">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider" htmlFor="email">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-none"
                  placeholder="admin@mainpower.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider" htmlFor="password">Password</label>
                <a href="/forgot-password" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full mt-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 active:scale-[0.98] disabled:opacity-60"
            >
              {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Sign in to Portal"}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          © 2026 Mainpower. Secure Admin Access.
        </p>
      </div>
    </div>
  );
}