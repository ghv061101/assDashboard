import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

type PrivateRouteProps = {
  allowedRoles?: string[];
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
