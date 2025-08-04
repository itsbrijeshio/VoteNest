import { AuthProvider } from "@/auth";
import { AuthLayout, DefaultLayout } from "@/layouts";
import { Dashboard, Home, Login, NewPoll, Register, SinglePoll } from "@/pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ProtectRoute from "./ProtectRoute";

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public with restricted */}
          <Route element={<PublicRoute restricted />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Route>

          {/* Public  */}
          <Route element={<DefaultLayout />}>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/polls/:pollId" element={<SinglePoll />} />
            </Route>

            {/* Protect  */}
            <Route element={<ProtectRoute />}>
              <Route path="/new" element={<NewPoll />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
