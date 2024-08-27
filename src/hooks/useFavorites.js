import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { firestore } from '../Firebase/Firebase';
import toast from 'react-hot-toast';
import { setFavoriteImages } from '../redux/Slices/postSlice'; // Adjust import according to your setup

const useFavorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.user);
  const [favoriteImages, setFavoriteImagesState] = useState([]);

  const fetchFavoriteImages = async () => {
    if (!isAuthenticated) return;

    try {
      const favoritesDocRef = doc(firestore, 'favorites', currentUser?.uid);
      const favoritesDoc = await getDoc(favoritesDocRef);

      if (favoritesDoc.exists()) {
        const favoriteImagesData = favoritesDoc.data().favoriteImages || [];
        setFavoriteImagesState(favoriteImagesData);
        dispatch(setFavoriteImages(favoriteImagesData)); // Ensure this is a plain array
      } else {
        setFavoriteImagesState([]);
        dispatch(setFavoriteImages([])); // Ensure this is a plain array
      }
    } catch (error) {
      console.error('Error fetching favorite images:', error);
      toast.error('Error loading favorite images');
    }
  };

  const addToFavorites = async (price, imageUrl, userName, id, title) => {
    if (!isAuthenticated) {
      toast.error('Please log in to add to favorites.');
      navigate('/login');
      return;
    }

    try {
      const favoritesRef = doc(firestore, 'favorites', currentUser.uid);
      const newFavorite = {
        id,
        imageUrl,
        title,
        price,
        userName
      };

      await setDoc(
        favoritesRef,
        {
          favoriteImages: arrayUnion(newFavorite),
        },
        { merge: true }
      );

      // Update local state
      setFavoriteImagesState((prev) => [...prev, newFavorite]);
      dispatch(setFavoriteImages([...favoriteImages, newFavorite])); // Ensure plain array

      toast.success('Image added to favorites!');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast.error('Error adding to favorites');
    }
  };

  const removeFromFavorites = async (price, imageUrl, userName, id, title) => {
    if (!isAuthenticated) {
      toast.error('Please log in to remove from favorites.');
      navigate('/login');
      return;
    }

    try {
      const favoritesRef = doc(firestore, 'favorites', currentUser.uid);
      const favoriteToRemove = {
        id,
        imageUrl,
        title,
        price,
        userName
      };

      await updateDoc(favoritesRef, {
        favoriteImages: arrayRemove(favoriteToRemove),
      });

      // Update local state
      setFavoriteImagesState((prev) => prev.filter((image) => image.id !== id));
      dispatch(setFavoriteImages(favoriteImages.filter((image) => image.id !== id))); // Ensure plain array

      toast.success('Image removed from favorites!');
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast.error('Error removing from favorites');
    }
  };

  return { addToFavorites, removeFromFavorites, fetchFavoriteImages, favoriteImages };
};

export default useFavorites;
