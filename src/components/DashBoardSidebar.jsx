import React from "react";
import { useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import { IoIosHeart, IoMdPhotos } from "react-icons/io";
import { SiGoogleanalytics } from "react-icons/si";
import { AiFillHome } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { FaListUl } from "react-icons/fa";

const DashBoardSidebar = () => {
  const pathname = useLocation();
  const user = useSelector((state) => state.auth.user);
  const userName = user?.userName || "guset";
  return (
    <nav className="flex text-lg font-semibold shadow-lg flex-col w-fit h-screen gap-2 p-3 list-none justify-between items-center">
      <div>
        <div className="bg-black my-5 rounded-full py-4 px-6 text-white w-fit">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col gap-2">
          {pathname === "/seller/profile" ? (
            <li className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center">
              <IoMdPhotos />
              Photo Management
            </li>
          ) : (
            <li className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center">
              {" "}
              <IoMdPhotos />
              Photo Purchased
            </li>
          )}
          <li className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center">
            <SiGoogleanalytics />
            Analytics
          </li>
          <li className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center">
            <FaListUl />
            Orders
          </li>
          <li className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center">
            <IoIosHeart />
            Favourites
          </li>
          <Link
            to="/"
            className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center"
          >
            <AiFillHome />
            Home
          </Link>
        </div>
      </div>
      <li className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center">
        <IoLogOut />
        Logout
      </li>
    </nav>
  );
};

export default DashBoardSidebar;
