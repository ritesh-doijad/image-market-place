import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firestore, storage } from "../Firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setMyPosts } from "../redux/Slices/postSlice";
import ImageCard from "./ImageCard";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import DashBoardHeader from "./DashBoardHeader";
import { IoArrowDownCircle } from "react-icons/io5";
import { getDownloadURL, ref } from "firebase/storage";
import { saveAs } from 'file-saver';

const PhotosPurchased = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.uid;
  const posts = useSelector((state) => state.posts.myPosts);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [postsFound, setPostsFound] = useState(true);

  const getMyPosts = async () => {
    try {
      if (!userId || posts.length > 0) return;
      setLoading(true);
      const productsRef = collection(firestore, "posts");
      const q = query(
        productsRef,
        where("purchasedBy", "array-contains", userId)
      );
      const querySnapshot = await getDocs(q);

      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt
          ? doc.data().createdAt.toMillis()
          : null,
      }));
      if (postsData.length === 0) {
        setPostsFound(false);
      } else {
        setPostsFound(true);
        dispatch(setMyPosts(postsData));
      }
    } catch (error) {
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "posts", id));
      // Remove the deleted post from the local state
      dispatch(setMyPosts(posts.filter((post) => post.id !== id)));
      toast.success("Image deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete the image");
    }
  };

  useEffect(() => {
    if (posts.length === 0) {
      getMyPosts();
    } else {
      setPostsFound(true);
    }
  }, [posts.length]);

  const downloadImage = async (imageUrl) => {
    try {
      const storageRef = ref(storage, imageUrl);
      const url = await getDownloadURL(storageRef);
  
      saveAs(url, imageUrl.substring(imageUrl.lastIndexOf('/') + 1));
  
      console.log('Image downloaded successfully!');
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };
  

  return (
    <div>
      <DashBoardHeader />
      <h1 className="text-2xl font-semibold mb-5 ml-8">Image Purchased</h1>
      <div className="mx-8">
        {loading && <p>Loading...</p>}
        {!loading && !postsFound && (
          <p className="text-center text-lg">No images purchased.</p>
        )}
        <div
          className={`grid md:grid-cols-3 gap-4 overflow-y-auto scrollbar-hide ${
            postsFound ? "" : "hidden"
          }`}
          style={{ maxHeight: "550px" }}
        >
          {posts.map(({ id, title, price, userName, imageUrl }) => (
            <ImageCard
              key={id}
              img={imageUrl}
              auther={userName}
              title={title}
              price={price}
              icon1={
                <IoArrowDownCircle
                  title="Download Now"
                  className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                  onClick={() => downloadImage(imageUrl)}
                />
              }
              icon2={
                <MdDelete
                  title="Delete"
                  className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                  onClick={() => handleDelete(id)}
                />
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotosPurchased;
