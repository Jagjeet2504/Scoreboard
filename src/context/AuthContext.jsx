import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthUser = createContext();
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/auth/me", {
        withCredentials: true,
      });
      setUser(data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data } = await axios.post(
      "http://localhost:3000/api/auth/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    console.log(name, email, password);
    const { data } = await axios.post(
      "http://localhost:3000/api/auth/register",
      {
        name,
        email,
        password,
      },
      { withCredentials: true }
    );
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:3000/api/auth/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  return (
    <AuthUser.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthUser.Provider>
  );
};

export { AuthContext, AuthUser };
