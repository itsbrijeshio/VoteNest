import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { FaPoll } from "react-icons/fa";
import { useAuth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const { loading, login } = useAuth();

  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (data) => {
      login(data)();
    },
  });

  return (
    <section className="w-[360px] md:w-[400px] flex flex-col gap-5 p-5 bg-background rounded-md border">
      <div className="text-center">
        <Link to="/" className="w-fit mx-auto mb-3 flex gap-1">
          <FaPoll className="text-2xl text-primary  mx-auto" />
          <span className="text-xl">Vote</span>
          <strong className="text-xl text-primary">Nest</strong>
        </Link>
        <h2 className="text-2xl">Welcome back</h2>
        <p className="opacity-75">
          Enter your credentials below to login to your account
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email_field">Email ID</Label>
          <Input
            type="email"
            name="email"
            id="email_field"
            placeholder="em@example.com"
            required
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password_field">Password</Label>
            <Link to="/forgot-password" className="underline text-sm">
              Forgot your password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            id="password_field"
            placeholder="***********"
            required
            onChange={handleChange}
          />
        </div>
        <Button type="submit" disabled={loading}>
          Sign in
        </Button>
      </form>
      <div className="text-center">
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
