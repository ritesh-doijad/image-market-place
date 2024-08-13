import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav
      id="1"
      className={`flex flex-col sm:flex-row p-5 justify-between bg-white items-start sm:items-center gap-1 sm:gap-0 shadow-md ${
        pathname === "/seller/profile" || pathname === "/buyer/profile"
          ? "hidden"
          : "fixed"
      } right-0 left-0 z-30 top-0`}
    >
      {/* logo and site name */}
      <div className="flex items-center justify-between">
        <img src="/picprismlogo.png" alt="site logo" className="w-[50px]" />
        <Link to="/" className="font-bold text-3xl">
          Pic Prism
        </Link>
      </div>
      {/* list of other page */}
      <ul className="flex gap-5 font-semibold text-lg text-gray-400 ml-5 sm:ml-0">
        <Link to="/" className="hover:text-black cursor-pointer sm:p-2">
          About
        </Link>
        <Link to="/" className="hover:text-black cursor-pointer sm:p-2">
          Contact
        </Link>
        <Link to="/login" className="hover:text-black cursor-pointer sm:p-2">
          Log In
        </Link>
        <Link to="/signup" className="hover:text-black cursor-pointer sm:p-2">
          Sign Up
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
