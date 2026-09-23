import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role ? user.role.toLowerCase() : "";
  const normalizedAllowedRoles = allowedRoles.map((role) => role.toLowerCase());

  if (allowedRoles && !normalizedAllowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default ProtectedRoute;
