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
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = 'auth_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = db.users.find(u => u.email === email && u.password === password);

    if (foundUser) {
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

  const signup = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const existingUser = db.users.find(u => u.email === email);
    if (existingUser) {
      return false; // User already exists
    }

    const newUser = {
      id: String(Date.now()),
      email,
      password, // In real apps, never store plaintext passwords!
      role: "user"
    };
    db.users.push(newUser);

    const secureUser = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role
    };
    setUser(secureUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(secureUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
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
