import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/Slices/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      const user = resultAction.payload;
      setEmail("");
      setPassword("");
      navigate(`/${user.accountType}/profile`);
      toast.success("Login Successful");
    } else if (loginUser.rejected.match(resultAction)) {
      setError("Login failed. Please check your credentials.");
    }
    setLoading(false);
  };

  return (
    <div className="sm:mt-10 mt-10 min-h-screen flex w-full justify-center items-center">
      <div className="bg-white shadow-md rounded-3xl px-5 py-6 w-full sm:w-[27vw]">
        <h1 className="font-bold text-2xl text-center mb-4">Let's Connect!</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="your@email.com"
              className="shadow-md rounded-md w-full px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
              aria-label="Email Address"
              aria-required="true"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter Password Here"
              className="shadow-md rounded-md w-full px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
              aria-label="Password"
              aria-required="true"
              required
            />
          </div>
          <Link
            to="/forgot-password"
            className="text-sm text-gray-600 hover:text-black"
          >
            Forgot Password?
          </Link>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <div className="flex items-center justify-end mb-4">
            <Link className="text-xs text-black" to="/signup">
              Create Account
            </Link>
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md shadow-md font-medium text-white text-sm bg-black ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
            aria-label="Log In"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
