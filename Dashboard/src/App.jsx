// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { AuthProvider } from "./Pages/AuthContext";
// import ProtectedRoute from "./Pages/ProtectedRoute";

// import LoginPage from "./Pages/Login";
// import { DashboardStats } from "./Component/Common/Dashboard";
// import Blog from "./Component/Common/Blog";
// import Chat from "./Component/Chat";
// import JobAdmin from "./Component/Common/JobAdmin";

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>

//           {/* Public Route */}
//           <Route path="/login" element={<LoginPage />} />

//           {/* Protected Routes Wrapper */}
//           <Route element={<ProtectedRoute />}>
//             <Route path="/" element={<DashboardStats />} />
//             <Route path="/blog" element={<Blog />} />
//             <Route path="/jobs" element={<JobAdmin />} />
//             <Route path="/chat" element={<Chat />} />
//           </Route>

//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;

// src/App.jsx
//
// Single merged app entry point. The old standalone chat app's own
// App.jsx / context/AuthContext.jsx / pages/Login.jsx / pages/Dashboard.jsx
// are NOT used anymore — everything routes through this one AuthProvider
// and this one set of protected routes.

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./Pages/AuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";

import LoginPage from "./Pages/Login";
import { DashboardStats } from "./Component/Common/Dashboard";
import Blog from "./Component/Common/Blog";
import Chat from "./Component/Chat/index";
import JobAdmin from "./Component/Common/JobAdmin";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes Wrapper */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardStats />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/jobs" element={<JobAdmin />} />
            <Route path="/chat" element={<Chat />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;