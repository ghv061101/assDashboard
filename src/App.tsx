import React from 'react';
import type { ReactElement } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Ships from "./pages/ships/Ships";
import ViewShip from "./pages/ships/ViewShips";
import Job from "./pages/Jobs/Job";
import ViewJob from "./pages/Jobs/ViewJob";
import ViewProducts from "./pages/products/ViewProducts";
import ViewUser from "./pages/users/ViewUser";

import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";
import Footer from "./components/footer/Footer";

import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/login/Login";
import Profile from "./components/profile/Profile";
import Signup from "./pages/signup/SignUp";

import "./styles/global.scss";

// Define valid roles as const array
const VALID_ROLES = ['admin', 'inspector', 'engineer', 'user'] as const;
type ValidRole = typeof VALID_ROLES[number];

// Layout component for main structure
const Layout: React.FC = () => (
  <div className="main">
    <Navbar />
    <div className="container">
      <div className="menuContainer">
        <Menu />
      </div>
      <div className="contentContainer">
        <Outlet />
      </div>
    </div>
    <Footer />
  </div>
);

// PrivateRoute wrapper for auth + role-based access
type PrivateRouteProps = {
  children: ReactElement;
  allowedRoles?: ValidRole[];
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();

  // Show loading state while checking auth
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role access
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user.role.toLowerCase() as ValidRole;
    const hasAccess = allowedRoles.map(r => r.toLowerCase()).includes(userRole);
    
    if (!hasAccess) {
      console.log(`Access denied: User role ${userRole} not in allowed roles:`, allowedRoles);
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

// Router setup with typed roles
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { 
        path: "/", 
        element: <Home /> 
      },
      {
        path: "/users",
        element: (
          <PrivateRoute allowedRoles={["admin", "inspector", "engineer"]}>
            <Users />
          </PrivateRoute>
        ),
      },
      {
        path: "/users/:id",
        element: (
          <PrivateRoute allowedRoles={["admin", "inspector", "engineer"]}>
            <ViewUser />
          </PrivateRoute>
        ),
      },
      {
        path: "/products",
        element: (
          <PrivateRoute allowedRoles={["admin", "inspector", "engineer"]}>
            <Products />
          </PrivateRoute>
        ),
      },
      {
        path: "/products/:id",
        element: (
          <PrivateRoute allowedRoles={["admin", "inspector", "engineer"]}>
            <ViewProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "/ships",
        element: (
          <PrivateRoute allowedRoles={["admin", "inspector", "engineer"]}>
            <Ships />
          </PrivateRoute>
        ),
      },
      {
        path: "/ships/:id",
        element: (
          <PrivateRoute allowedRoles={["admin", "inspector", "engineer"]}>
            <ViewShip />
          </PrivateRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <PrivateRoute allowedRoles={["admin", "inspector", "engineer", "user"]}>
            <Job />
          </PrivateRoute>
        ),
      },
      {
        path: "/jobs/:id",
        element: (
          <PrivateRoute allowedRoles={["admin", "inspector", "engineer", "user"]}>
            <ViewJob />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute allowedRoles={["admin", "inspector", "engineer", "user"]}>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "*", element: <Navigate to="/" replace /> },
]);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;