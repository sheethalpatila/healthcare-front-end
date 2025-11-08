// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import API, { setAuthHeader } from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      setAuthHeader(token);
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id, role: decoded.role });
      } catch (err) {
        setUser(null);
      }
      localStorage.setItem('token', token);
    } else {
      setAuthHeader(null);
      setUser(null);
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = (token) => setToken(token);
  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, API }}>
      {children}
    </AuthContext.Provider>
  );
};
