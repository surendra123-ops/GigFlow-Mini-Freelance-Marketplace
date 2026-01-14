import { createContext, useState, useEffect } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login
  const login = async (email, password) => {
  try {
    await api.post("/auth/login", { email, password });
    await fetchUser();
    toast.success("Login successful!");
    return { ok: true };
  } catch (err) {
    const msg = err.response?.data?.message || "Login failed";
    toast.error(msg);
    return { ok: false };
  }
};


  // Register
  const register = async (name, email, password) => {
    try {
      await api.post("/auth/register", { name, email, password });
      await fetchUser();
      toast.success("Registration successful!");

      return { ok: true };
    } catch (err) {
      return { ok: false, msg: err.response?.data?.message };
    }
  };

  const logout = async () => {
  try {
    await api.post("/auth/logout");
    toast.success("Logged out");

    setUser(null);
  } catch (err) {
    console.log("Logout error:", err);
  }
};

  // Fetch user data using cookie
  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    }
  };

  // On first load
  useEffect(() => {
    const init = async () => {
      await fetchUser();
      setLoading(false);
    };
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
