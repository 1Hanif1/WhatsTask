import { Route, Navigate } from "react-router-dom";

function ProtectedRoute({ element, ...props }) {
  const jwt = localStorage.getItem("jwt");
  return jwt ? element : <Navigate to="/auth?mode=login" replace />;
}

export default ProtectedRoute;
