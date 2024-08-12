import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("buyer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch(null);
  const navigate=useNavigate()

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const resultAction = await dispatch(
      registerUser({ email, password, userName, accountType })
    );
    if (registerUser.fulfilled.match(resultAction)) {
      setUserName("");
      setEmail("");
      setPassword("");
      setAccountType("buyer");
      navigate("/")
    } else if (registerUser.rejected.match(resultAction)) {
      setError("User already exists");
    }
    setLoading(false);
  };
  return (
    <div className="sm:mt-10 mt-20 min-h-screen flex w-full justify-center items-center">
      <div className="bg-white shadow-md rounded-3xl px-5 py-6 w-full sm:w-[27vw]">
        <h1 className="font-bold text-2xl text-center mb-4">Let's Connect!</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter Your Name"
              className="shadow-md rounded-md w-full px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address :
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="shadow-md rounded-md w-full px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password :
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password Here"
              className="shadow-md rounded-md w-full px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Your Account Type :
            </label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="shadow-md rounded-md w-full px-3 py-2 border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <div className="flex items-center justify-end mb-4">
            <Link className="text-xs text-black " to="/login">
              Login With Account
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md shadow-md font-medium text-white text-sm bg-black hover:"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
