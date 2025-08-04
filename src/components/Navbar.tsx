import { Link, NavLink } from "react-router-dom";
import { FaPoll } from "react-icons/fa";
import { Button } from "./ui/button";
import { useAuth } from "@/auth";
import { MdLightMode } from "react-icons/md";
import { LuSunMoon } from "react-icons/lu";
import { useTheme } from "./theme-provider";

const Navbar = () => {
  const { authenticated, logout } = useAuth();
  const { setTheme, theme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="fixed top-0 left-0 w-full border-b bg-background z-50">
      <div className="w-[90%] flex items-center justify-between mx-auto py-2">
        <Link to="/" className="flex items-center gap-1 font-mozilla-headline">
          <FaPoll className="text-2xl text-primary me-1" />
          <span className="text-xl">Vote</span>
          <strong className="text-xl text-primary">Nest</strong>
        </Link>

        <div className="block">
          <Link to={"/new"}>
            <Button className="text-white rounded-none">Create Poll</Button>
          </Link>
        </div>

        <div className="hidden md:flex gap-2">
          <NavLink to={"/"}>
            <Button variant={"link"} className="text-destructive rounded-none">
              Public Polls
            </Button>
          </NavLink>
          {authenticated ? (
            <>
              <NavLink to={"/dashboard"}>
                <Button
                  variant={"link"}
                  className="text-foreground rounded-none"
                >
                  Dashboard
                </Button>
              </NavLink>
              <Button
                variant={"link"}
                className="text-foreground rounded-none"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <Button
                  variant={"link"}
                  className="text-foreground rounded-none"
                >
                  Login
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button variant={"secondary"} className="rounded-none">
                  Sign up
                </Button>
              </Link>
            </>
          )}

          <Button
            variant={"ghost"}
            className="rounded-full"
            onClick={handleTheme}
          >
            {theme == "dark" ? <MdLightMode /> : <LuSunMoon />}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
