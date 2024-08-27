import React, { useEffect, useState } from "react";
import DashBoardHeader from "./DashBoardHeader";
import ImageAdd from "./ImageAdd";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../Firebase/Firebase";
import { setMyPosts } from "../redux/Slices/postSlice";
import ImageCard from "../components/ImageCard";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const PhotoManagement = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.uid;
  const posts = useSelector((state) => state.posts.myPosts);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getMyPosts = async () => {
    try {
      if (!userId || posts.length > 0) return;
      setLoading(true);

      const productsRef = collection(firestore, "posts");
      const q = query(productsRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      // Map through the querySnapshot to get posts data
      const postsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? data.createdAt.toMillis() : null, // Convert to milliseconds
        };
      });
      toast.success("Data is Successfully fetch");
      dispatch(setMyPosts(postsData)); // Save the data to the state
    } catch (error) {
      toast.error("Failed to fetch posts");
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (posts.length === 0) {
      getMyPosts();
    }
  }, [userId, posts.length]);

  return (
    <div className="flex flex-col sm:flex-row">
      <div>
        <DashBoardHeader />
        <ImageAdd />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-transparent sm:bg-white p-5 w-[90vw] sm:w-[55vw] sm:h-[95vh] sm:overflow-y-scroll scrollbar-hide rounded-lg mx-auto sm:mx-0 sm:mt-8">
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length > 0 ? (
          posts.map(({ id, title, price, userName, imageUrl }) => (
            <ImageCard
              key={id}
              img={imageUrl}
              auther={userName}
              title={title}
              price={price}
              icon1={
                <BiSolidMessageSquareEdit
                  title="Edit"
                  className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                />
              }
              icon2={
                <MdDelete className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
              }
            />
          ))
        ) : (
          <p>No posts available. Add a new product!</p>
        )}
      </div>
    </div>
  );
};

export default PhotoManagement;
