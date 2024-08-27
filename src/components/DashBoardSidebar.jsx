import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import { IoIosHeart, IoMdPhotos } from "react-icons/io";
import { SiGoogleanalytics } from "react-icons/si";
import { AiFillHome } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { FaListUl } from "react-icons/fa";
import { setTab } from "../redux/Slices/navSlice";
import { logout } from "../redux/Slices/authSlice";

const DashBoardSidebar = () => {
  const dispatch = useDispatch();
  const tab = useSelector((state) => state.nav.tab);
  const sidebar = useSelector((state) => state.nav.sidebar);
  const {pathname} = useLocation();
  const user = useSelector((state) => state.auth.user);
  const userName = user?.userName || "guset";
  const role=user?.accountType || "buyer"
 
  return (
    <nav
      className={`fixed z-10 ${
        !sidebar == true ?"-translate-x-[500px] sm:translate-x-0":"translate-x-0"
      } ease-in-out duration-300 sm:static flex bg-white text-lg font-semibold shadow-lg flex-col w-fit min-h-screen gap-2 p-3 list-none justify-between items-center`}
    >
      <div>
        <div className="bg-black my-5 rounded-full py-4 px-6 text-white w-fit">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col gap-2">
          {pathname === "/seller/profile" ? (
            <li
              className={`w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${
                tab == "photo-management" && "bg-black text-white"
              }`}
              onClick={() => dispatch(setTab("photo-management"))}
            >
              <IoMdPhotos />
              Photo Management
            </li>
          ) : (
            <li
              className={`w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${
                tab == "photo-purchased" && "bg-black text-white"
              }`}
              onClick={() => dispatch(setTab("photo-purchased"))}
            >
              <IoMdPhotos />
              Photo Purchased
            </li>
          )}
          <li
            className={`w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${
              tab == "analytics" && "bg-black text-white"
            }`}
            onClick={() => dispatch(setTab("analytics"))}
          >
            <SiGoogleanalytics />
            Analytics
          </li>
          <li
            className={`w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${
              tab == "order" && "bg-black text-white"
            }`}
            onClick={() => dispatch(setTab("orders"))}
          >
            <FaListUl />
            Orders History
          </li>
          {role=="buyer"&& (<li
            className={`w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${
              tab == "favourites" && "bg-black text-white"
            }`}
            onClick={() => dispatch(setTab("favourites"))}
          >
            <IoIosHeart />
            Favourites
          </li>)}
          
          <Link
            to="/"
            className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center"
          >
            <AiFillHome />
            Home
          </Link>
        </div>
      </div>
      <li className="w-full rounded-lg px-2 hover:bg-black hover:text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center"
      onClick={()=>dispatch(logout())}>
        <IoLogOut />
        Logout
      </li>
    </nav>
  );
};

export default DashBoardSidebar;
