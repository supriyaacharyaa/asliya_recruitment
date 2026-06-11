import { Navigate } from "react-router-dom";
import { useAuth } from "../Pages/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}