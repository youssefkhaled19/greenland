import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = () => {
    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-slate-900 via-gray-800 to-gray-900">
      <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-8 w-[380px] text-white">
        <h2 className="text-3xl font-bold mb-2">Create Account</h2>
        <p className="text-gray-300 text-sm mb-8">
          Join us and start generating quizzes effortlessly.
        </p>

        <div className="w-full space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-transparent border border-gray-400 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-transparent border border-gray-400 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-transparent border border-gray-400 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handleSignin}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold text-white py-2.5 rounded-md hover:opacity-90 transition-all duration-200 shadow-lg"
          >
            Sign Up
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-8">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-400 font-medium hover:underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signin;
