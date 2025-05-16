import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { db } from "../db";

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = 'auth_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem(AUTH_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem(AUTH_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = db.users.find(u => {
      return u.email === email && u.password === password;
    });

    if (foundUser) {
      // Never store password in state or localStorage
      const secureUser = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role
      };
      setUser(secureUser);
      localStorage.setItem(AUTH_KEY, JSON.stringify(secureUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Custom hook for protecting routes
export const useRequireAuth = (allowedRoles?: string[]) => {
  const { user, isLoading } = useAuth();

  if (!isLoading && !user) {
    throw new Error("Unauthorized access");
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    throw new Error("Insufficient permissions");
  }

  return { user, isLoading };
};