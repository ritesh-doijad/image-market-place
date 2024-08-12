import React from "react";
import { IoIosSearch } from "react-icons/io";
const HeroSection = () => {
  return (
    <div className="sm:w-[60vw] h-[20vw] overflow-clip sm:rounded-3xl mx-auto flex justify-center items-center">
      <form className=" absolute flex justify-center items-center">
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search your Assets"
          className="py-5 px-3 w-[80vw] sm:w-[40vw] text-xl sm:text-3xl mx-auto outline-none bg-bgColor border-b-2 "
        />
        <IoIosSearch className="text-3xl sm:text-5xl text-gray-400 -ml-10" />
      </form>
    </div>
  );
};

export default HeroSection;
