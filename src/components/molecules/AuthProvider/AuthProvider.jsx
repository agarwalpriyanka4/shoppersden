import React, { createContext, useContext, useState, useEffect } from "react";
import "./AuthProvider.css";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Verify token (used on app load + can be reused)
  const verifyToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(import.meta.env.VITE_TOKEN_API, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Invalid token");

      await res.json();
      setIsAuthenticated(true);
    } catch (err) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Run only once on initial app load
  useEffect(() => {
    verifyToken();
  }, []);

  // ✅ Call this after successful login
  const login = (token) => {
    //localStorage.setItem("token", token);
    setIsAuthenticated(true);   //THIS makes ProtectedRoute true immediately
  };

  // ✅ Call this on logout or token failure
  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout, verifyToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
