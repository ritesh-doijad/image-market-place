import React from "react";
import { IoIosSearch } from "react-icons/io";
import { firestore } from "../Firebase/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setAllPosts } from "../redux/Slices/postSlice";
const HeroSection = () => {
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    try {
      const searchQuery = e.target.value;

      if (searchQuery.trim()) {
        const productRef = collection(firestore, "products");
        const querySnapshot = await getDocs(productRef);
        const searchResults = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              createdAt: data.createdAt ? data.createdAt.toMillis() : null,
            };
          })
          .filter((product) =>
            product.title.toLowerCase().includes(searchQuery)
          );
        dispatch(setAllPosts(searchResults));
      } else {
        console.log("No search query provided");
      }
    } catch (error) {
      console.log("error is search", error);
    }
  };

  return (
    <div className="sm:w-[60vw] h-[20vw] overflow-clip sm:rounded-3xl mx-auto flex justify-center items-center">
      <form className=" absolute flex justify-center items-center">
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search your Assets"
          onChange={handleSearch}
          className="py-5 px-3 w-[80vw] sm:w-[40vw] text-xl sm:text-3xl mx-auto outline-none bg-bgColor border-b-2 "
        />
        <IoIosSearch className="text-3xl sm:text-5xl text-gray-400 -ml-10" />
      </form>
    </div>
  );
};

export default HeroSection;
