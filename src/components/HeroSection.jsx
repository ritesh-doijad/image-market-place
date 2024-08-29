import React, { useCallback } from "react";
import { IoIosSearch } from "react-icons/io";
import { firestore } from "../Firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setAllPosts } from "../redux/Slices/postSlice";
import debounce from "lodash.debounce";

const HeroSection = () => {
  const dispatch = useDispatch();

  // Function to fetch all posts
  const fetchAllPosts = async () => {
    try {
      const productRef = collection(firestore, "posts");
      const querySnapshot = await getDocs(productRef);

      const allPosts = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? data.createdAt.toMillis() : null,
        };
      });

      dispatch(setAllPosts(allPosts));
    } catch (error) {
      console.log("Error fetching all posts", error);
    }
  };

  // Debounced search function
  const handleSearch = useCallback(
    debounce(async (searchQuery) => {
      try {
        if (searchQuery.trim()) {
          const productRef = collection(firestore, "posts");
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
          // Fetch all posts when search query is empty
          fetchAllPosts();
        }
      } catch (error) {
        console.log("Error in search", error);
      }
    }, 500), // Adjust debounce delay (in milliseconds) as needed
    [dispatch] // Add dispatch as a dependency
  );

  // Handler to process search input
  const onSearchChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    handleSearch(searchQuery); // Call the debounced search function
  };

  return (
    <div className="w-full flex justify-center items-center py-10">
      <div className="relative w-[90vw] sm:w-[60vw] max-w-2xl h-auto rounded-full bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg overflow-hidden p-1 mx-auto flex items-center">
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search your Assets"
          onChange={onSearchChange}
          className="w-full py-4 px-6 text-lg sm:text-2xl outline-none rounded-full bg-white text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 transition duration-300"
        />
        <IoIosSearch className="absolute right-5 text-3xl text-teal-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default HeroSection;
