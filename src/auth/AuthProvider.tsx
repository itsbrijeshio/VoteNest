import { useEffect, useState, type ReactNode } from "react";
import AuthContext, { type UserType } from "./AuthContext";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";

const errorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data.error?.message || error?.message;
    toast.error(message);
  } else {
    toast.error(String(error));
  }
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [profileLoading, setProfileLoading] = useState<boolean>(true);

  const register = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = (await axiosInstance.post("/auth/register", data)).data;
      return response;
    } catch (error) {
      errorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = (await axiosInstance.post("/auth/login", data)).data;
      if (response.success) {
        window.location.reload();
      }
      return response;
    } catch (error) {
      errorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const response = (await axiosInstance.get("/auth/logout")).data;
      if (response.success) {
        window.location.reload();
      }
      return response;
    } catch (error) {
      errorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      const response = (await axiosInstance.get("/auth/me")).data;
      if (response.success) {
        setUser(response.data);
        setAuthenticated(true);
      }
      return response;
    } catch (error: unknown) {
      errorMessage(error);
    } finally {
      setProfileLoading(false);
    }
  };

  const value = {
    user,
    authenticated,
    loading,
    register,
    login,
    logout,
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (profileLoading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
