import { useEffect, useState, type ReactNode } from "react";
import AuthContext, { type UserType } from "./AuthContext";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";

const errorHandle =
  (
    fn: () => void,
    setLoading: (data: boolean) => void,
    isMessageShow: boolean = true
  ) =>
  async () => {
    setLoading(true);
    try {
      const response: any = await fn();
      if (response.success) {
        const message = response.message || "Success";
        if (isMessageShow) toast.success(message);
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ||
        error?.message ||
        "Something went wrong.";
      if (isMessageShow) toast.error(message);
    } finally {
      setLoading(false);
    }
  };

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [profileLoading, setProfileLoading] = useState<boolean>(false);

  const register = (data: { name: string; email: string; password: string }) =>
    errorHandle(async () => {
      const response = (await axiosInstance.post("/auth/register", data)).data;
      return response;
    }, setLoading);

  const login = (data: { email: string; password: string }) =>
    errorHandle(async () => {
      const response = (await axiosInstance.post("/auth/login", data)).data;
      if (response.success) {
        window.location.reload();
      }
      return response;
    }, setLoading);

  const logout = errorHandle(
    async () => {
      const response = (await axiosInstance.get("/auth/logout")).data;
      if (response.success) {
        window.location.reload();
      }
      return response;
    },
    setProfileLoading,
    false
  );

  const getProfile = errorHandle(
    async () => {
      const response = (await axiosInstance.get("/auth/me")).data;
      if (response.success) {
        setUser(response.data);
        setAuthenticated(true);
      }
      return response;
    },
    setProfileLoading,
    false
  );

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
