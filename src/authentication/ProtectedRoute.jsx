import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "@/hooks/auth/useAuth";
import NeonSpinner from "@/ui/NeonSpinner";

function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <NeonSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
