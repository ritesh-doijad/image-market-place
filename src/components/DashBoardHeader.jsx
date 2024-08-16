import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiMenu3Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { toggleSidebar } from "../redux/Slices/navSlice";

const DashBoardHeader = () => {
  const user = useSelector((state) => state.auth.user);
  const sidebar = useSelector((state) => state.nav.sidebar);
  const dispatch = useDispatch();
  const userName = user?.userName || "guset";
  const accountType=user?.accountType || "buyer"
  return (
    <>
      <div className="my-5 mx-8">
        <h1 className="text-3xl font-bold">
          Hello {userName?.charAt(0).toUpperCase() + userName?.slice(1)},
        </h1>
        <p>welcome to your {accountType} dashboard</p>
      </div>
      {/* hamburger for phone */}
      <RiMenu3Fill onClick={()=>dispatch(toggleSidebar())}
        className={`${
          sidebar === true ? "hidden" : "block sm:hidden"
        } text-3xl absolute top-5 right-5`}
      />
       <IoClose onClick={()=>dispatch(toggleSidebar())}
        className={`${
          sidebar === true ? "block sm:hidden" : "hidden"
        } text-3xl absolute top-5 right-5`}
      />
    </>
  );
};

export default DashBoardHeader;
