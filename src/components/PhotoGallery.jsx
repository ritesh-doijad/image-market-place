import React from "react";
import ImageCard from "./ImageCard";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";

const PhotoGallery = () => {
  return (
    <div className="my-20 bg-white flex flex-col justify-center items-center">
      <h3 className="text-3xl font-semibold my-14">Photo</h3>

      {/* all photo are listed here */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-20">
        {/* photo div */}
        <ImageCard
          img="https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          auther="ritesh"
          title="the Game"
          price="50"
          icon1={
            <FaShoppingCart className="text-2xl  text-black cursor-pointer hover:scale-110 transition-all  ease-linear duration-300" />
          }
          icon2={
            <IoIosHeart className="text-2xl  text-red-500 cursor-pointer hover:scale-110 transition-all  ease-linear duration-300" />
          }
        />
        <ImageCard
          img="https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          auther="sandesh"
          title="the Game"
          price="150"
          icon1={
            <FaShoppingCart className="text-2xl  text-black cursor-pointer hover:scale-110 transition-all  ease-linear duration-300" />
          }
          icon2={
            <IoIosHeart className="text-2xl  text-red-500 cursor-pointer hover:scale-110 transition-all  ease-linear duration-300" />
          }
        />
        <ImageCard
          img="https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          auther="vaibhav"
          title="the Game"
          price="120"
          icon1={
            <FaShoppingCart className="text-2xl  text-black cursor-pointer hover:scale-110 transition-all  ease-linear duration-300" />
          }
          icon2={
            <IoIosHeart className="text-2xl  text-red-500 cursor-pointer hover:scale-110 transition-all  ease-linear duration-300" />
          }
        />
      </div>
    </div>
  );
};

export default PhotoGallery;
