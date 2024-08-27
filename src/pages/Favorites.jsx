import React, { useEffect } from "react";
import DashBoardHeader from "../components/DashBoardHeader";
import useFavorites from "../hooks/useFavorites";
import { useSelector } from "react-redux";
import ImageCard from "../components/ImageCard";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";

const Favorites = () => {
    const { addToFavorites, removeFromFavorites, fetchFavoriteImages, favoriteImages } = useFavorites();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            fetchFavoriteImages(); // Fetch favorite images when the component mounts
        }
    }, [fetchFavoriteImages, isAuthenticated]);

    // Check if an image is in favorites
    const isImageInFavorites = (id) => {
        return favoriteImages.some((image) => image.id === id);
    };

    return (
        <div>
            <DashBoardHeader />
            <h1 className="text-2xl font-semibold mb-5 ml-8">Favorite Images</h1>
            <div
                className="mx-8 grid md:grid-cols-3 gap-4 overflow-y-auto scrollbar-hide"
                style={{ maxHeight: "550px" }}
            >
                {favoriteImages.map(({ id, title, price, userName, imageUrl }) => (
                    <ImageCard
                        key={id}
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
                                    onClick={() =>
                                        removeFromFavorites(price, imageUrl, userName, id, title)
                                    }
                                />
                            ) : (
                                <FaRegHeart
                                    className="text-2xl cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                                    onClick={() =>
                                        addToFavorites(price, imageUrl, userName, id, title)
                                    }
                                />
                            )
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
