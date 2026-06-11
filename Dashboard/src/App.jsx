import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Pages/AuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";
import LoginPage from "./Pages/Login";

import Dashboard from "../src/Component/Common/Dashboard";
import Blog from "./Component/Common/Blog";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
            
         <Route path="/blog" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
