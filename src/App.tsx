import React from "react";
import type { ReactElement } from "react";
import Home from "./pages/home/Home";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";

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

import './app.scss';
import './styles/global.scss';

function App() {
  const Layout = () => (
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

  const PrivateRoute: React.FC<{ 
    children: ReactElement; 
    allowedRoles?: string[] 
  }> = ({ children, allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
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
    { path: "*", element: <Navigate to="/" replace /> }
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;