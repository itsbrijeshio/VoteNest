import { FaPoll } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Register = () => {
  const { loading, register } = useAuth();

  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (data) => {
      register(data)();
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
        <h2 className="text-2xl">Welcome to VoteNest</h2>
        <p className="opacity-75">
          Enter your credentials below to create your account
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name_field">Name</Label>
          <Input
            type="text"
            name="name"
            id="name_field"
            placeholder="Emma Watson"
            required
            onChange={handleChange}
          />
        </div>
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
          <Label htmlFor="password_field">Password</Label>
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
          Sign up
        </Button>
      </form>
      <div className="text-center">
        <p>
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
