import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const storedEmail = localStorage.getItem("email");
  const storedPassword = localStorage.getItem("password");

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    const { email, password } = form;
    if (email === storedEmail && password === storedPassword) {
      navigate("/Upload");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-slate-900 via-gray-800 to-gray-900">
      <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-8 w-[380px] text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
        <p className="text-gray-300 text-sm mb-8">
          Log in to continue your learning journey.
        </p>

        <div className="w-full space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full bg-transparent border border-gray-400 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-transparent border border-gray-400 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold text-white py-2.5 rounded-md hover:opacity-90 transition-all duration-200 shadow-lg"
          >
            Sign In
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-8">
          Don’t have an account?{" "}
          <Link
            to="/signin"
            className="text-indigo-400 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
