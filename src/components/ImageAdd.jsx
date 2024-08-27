import React, { useState } from "react";
import toast from "react-hot-toast";
import { firestore, storage } from "../Firebase/Firebase";
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const ImageAdd = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const addPost = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const price = parseFloat(e.target.price.value);

    if (!title || isNaN(price) || !image) {
      toast.error("Please fill all the fields and select an image");
      return;
    }

    if (title.trim() === "" || price <= 0) {
      toast.error("Please fill all the fields and select an image");
      return;
    }

    try {
      setLoading(true);

      const storageRef = ref(storage, `images/${Date.now()}_${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          const formattedProgress = parseFloat(progress.toFixed(2));
          setProgress(formattedProgress);
        },
        (error) => {
          toast.error("Failed to upload image");
          console.error("Upload error:", error);
          setLoading(false);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            const post = {
              title,
              price,
              imageUrl: downloadURL,
              userId: user.uid,
              userName: user.userName,
              purchasedBy: [],
              createdAt: new Date(),
            };

            await addDoc(collection(firestore, "posts"), post);

            toast.success("Product added successfully");
            setProgress(0);
            setImage(null);
            e.target.reset();
          } catch (error) {
            toast.error("Failed to add product");
          } finally {
            setLoading(false);
          }
        }
      );
    } catch (error) {
      toast.error("Post not added");
      console.error("General error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-5 bg-white mx-9 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold">Add new Product</h2>
      <form className="grid grid-cols-1 gap-2 my-4" onSubmit={addPost}>
        <img
          src={`${
            image ? URL.createObjectURL(image) : "https://placehold.co/600x400"
          } `}
          alt=""
          className="w-[350px] h-[25vh] sm:h-[30vh] rounded-lg object-cover"
        />
        {progress > 0 && (
          <ProgressBar
            completed={progress}
            bgColor="black"
            transitionTimingFunction="ease-in"
          />
        )}

        <div className="flex flex-col">
          <label htmlFor="" className="font-bold">
            Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            name="image"
            id="image"
            className="rounded-lg border outline-none px-3 py-1 mt-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="title" className="font-bold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="rounded-lg border outline-none px-3 py-1 mt-1"
            placeholder="Enter your title"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="font-bold">
            Price
          </label>
          <input
            type="text"
            name="price"
            required
            id="price"
            className="rounded-lg border outline-none px-3 py-1 mt-1"
            placeholder="450"
          />
        </div>
        <button
          type="submit"
          className={`py-1 px-3 bg-black font-semibold text-white rounded-lg mt-2 ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ImageAdd;
