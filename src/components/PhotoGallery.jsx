import React, { useEffect, useState, useRef } from 'react';
import ImageCard from './ImageCard';
import { FaShoppingCart, FaRegHeart, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc, collection, getDocs, addDoc, serverTimestamp, updateDoc, arrayUnion } from 'firebase/firestore';
import { firestore } from '../Firebase/Firebase';
import { setAllPosts } from '../redux/Slices/postSlice';
import toast from 'react-hot-toast';
import useFavorites from '../hooks/useFavorites'; // Import the custom hook

const PhotoGallery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.posts.allPosts);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.user?.accountType);
  const [payment, setPayment] = useState(false);
  const [amount, setAmount] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [title, setTitle] = useState('');
  const [productId, setProductId] = useState('');
  const [showSecondIframe, setShowSecondIframe] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { addToFavorites, removeFromFavorites, fetchFavoriteImages, favoriteImages } = useFavorites();

  const paymentRef = useRef(null);

  const getAllImages = async () => {
    if (posts.length > 0) return;
    try {
      const querySnapshot = await getDocs(collection(firestore, 'posts'));
      const imagesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? data.createdAt.toMillis() : null,
        };
      });
      dispatch(setAllPosts(imagesData));
    } catch (error) {
      toast.error('Failed to fetch posts');
    }
  };

  const purchaseImage = async (price, imageUrl, userName, id, title) => {
    if (!isAuthenticated) {
      toast.error('Please log in to purchase an image.');
      navigate('/login');
      return;
    }

    if (role === 'seller') {
      toast.error('Login with a Buyer Account to purchase');
      return;
    }

    try {
      const productDocRef = doc(firestore, 'posts', id);
      const productDoc = await getDoc(productDocRef);

      if (productDoc.exists()) {
        const purchasedBy = productDoc.data().purchasedBy || [];

        if (purchasedBy.includes(currentUser.uid)) {
          toast.error('You have already purchased this image.');
          return;
        }
      }

      // Set payment details and show payment UI
      setPayment(true);
      setAmount(price);
      setImgUrl(imageUrl);
      setTitle(title);
      setProductId(id); // Store product ID
      setShowSecondIframe(false); // Ensure iframe state is reset
      setIsButtonDisabled(false); // Ensure button is enabled before purchase
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Error initiating payment');
    }
  };

  const handlePayNowClick = () => {
    setShowSecondIframe(true);
    setIsButtonDisabled(true); // Disable button when clicked
  };

  const PayNow = async () => {
    if (!productId || !amount) {
      toast.error('Payment details are missing.');
      return;
    }

    try {
      const ordersRef = collection(firestore, 'orders');
      await addDoc(ordersRef, {
        purchaserId: currentUser.uid,
        productId: productId,
        purchaserName: currentUser.userName,
        title: title,
        userName: currentUser.userName,
        imageUrl: imgUrl,
        price: amount,
        createdAt: serverTimestamp(),
      });

      const productDocRef = doc(firestore, 'posts', productId);
      await updateDoc(productDocRef, {
        purchasedBy: arrayUnion(currentUser.uid),
      });

      // Reset state after successful purchase
      setPayment(false);
      setAmount(null);
      setImgUrl('');
      setTitle('');
      setProductId('');
      setShowSecondIframe(false); // Hide iframe
      setIsButtonDisabled(false); // Re-enable button after order is placed
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Error placing order');
    }
  };

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      fetchFavoriteImages(); // Fetch favorite images when the component mounts
    }
  }, [isAuthenticated, currentUser, fetchFavoriteImages]);

  useEffect(()=>{
    getAllImages();
  },[])

  const isImageInFavorites = (id) => {
    return favoriteImages.some((image) => image.id === id);
};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (paymentRef.current && !paymentRef.current.contains(event.target)) {
        setPayment(false);
      }
    };

    if (payment) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [payment]);

  return (
    <>
      {payment && (
        <div className="w-full fixed z-50 top-5 h-screen flex justify-center items-center backdrop-blur-sm">
          <div
            ref={paymentRef}
            className="relative overflow-hidden w-80 h-[80vh] rounded-lg bg-white shadow-lg"
          >
            <div className="bg-gradient-to-r from-[#54d5f3] to-[#45b2e0] p-2 flex items-center border-b-2 shadow-md">
              <img src="/imagemarketlogo.png" alt="" className="w-28" />
              <h2 className="text-xl font-semibold">IMAGE MARKET</h2>
            </div>

            <div className="flex w-full h-20 p-2 shadow-md">
              <img
                src={imgUrl} // Use the image URL from state
                alt={title} // Use the title from state
                className="w-24 rounded-lg object-cover"
              />
              <div className="ml-2 mt-1 justify-center items-center font-semibold text-wrap">
                {title}
              </div>
            </div>
            <div className="w-full h-1/2 flex justify-center items-center">
              {!showSecondIframe ? (
                <iframe
                  className="w-full h-full"
                  src="https://lottie.host/embed/19ae998f-c59b-4c23-9820-94fa5fba8b10/TQFogAkk5S.json"
                ></iframe>
              ) : (
                <iframe
                  className=""
                  src="https://lottie.host/embed/c6e074fa-09f1-4155-84ad-22227730dac4/c8Y5xnUN7v.json"
                  onLoad={() => {
                    PayNow();
                  }}
                ></iframe>
              )}
            </div>

            <div className="absolute bottom-0 w-full flex justify-between border-t-2 border-gray-300 bg-white py-2">
              <div className="ml-5">
                <h2 className="text-2xl font-semibold">${amount}</h2>
                <p className="text-[12px] text-gray-500 font-medium cursor-pointer hover:underline">
                  View Details
                </p>
              </div>
              <button
                onClick={handlePayNowClick}
                disabled={isButtonDisabled}
                className="mr-5 bg-gradient-to-r from-[#54d5f3] to-[#45b2e0] text-white font-semibold p-2 rounded-lg hover:bg-blue-600 hover:scale-110 transition-all ease-linear duration-300"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-[90%] mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 mt-5">
          Discover &amp; Buy Stunning Images
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-20">
          {posts?.map(({ id, price, userName, imageUrl, title }) => (
            <ImageCard
              key={id}
              id={id}
              img={imageUrl}
              auther={userName}
              title={title}
              price={price}
              icon1={
                <FaShoppingCart
                  className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                  onClick={() =>
                    purchaseImage(price, imageUrl, userName, id, title)
                  }
                />
              }
              icon2={
                isImageInFavorites(id) ? (
                  <FaHeart
                    className="text-2xl text-red-600 cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                    onClick={() => removeFromFavorites(price, imageUrl, userName, id, title)}
                  />
                ) : (
                  <FaRegHeart
                    className="text-2xl cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                    onClick={() => addToFavorites(price, imageUrl, userName, id, title)}
                  />
                )
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PhotoGallery;
