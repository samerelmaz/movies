import { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";
import { api } from "../api/api";
import { isValidEmail, isValidPassword } from "../utils/auth";

interface AuthContextType {
  isLoggedIn: boolean;
  isAuthCheckCompleted: boolean;
  login: (data: { email: string; password: string }) => Promise<{
    success: boolean;
    error?: string;
  }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthCheckCompleted, setIsAuthCheckCompleted] = useState(false);

  // Check if user is already logged in on initial render
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setIsAuthCheckCompleted(true);
  }, []);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    // Validate email and password
    const isEmailValid = isValidEmail(email);
    const isPasswordValid = isValidPassword(password);

    if (!isEmailValid) {
      return { success: false, error: "Please enter a valid email address" };
    }

    if (!isPasswordValid) {
      return {
        success: false,
        error: "Password must be at least 6 characters long",
      };
    }

    try {
      // Call the mock API endpoint using axios
      const response = await api.auth.login({
        email,
        password,
      });

      // Store token from API response
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      return { success: true };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    isAuthCheckCompleted,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
