import React from 'react';

const ImageCard = ({ id, img, auther, title, price, icon1, icon2 }) => {
    return (
        <div key={id} className='max-w-sm w-full  rounded-lg bg-white shadow-lg p-4 m-2'>
            <div className='w-full h-[30vh] overflow-hidden rounded-2xl'>
                <img
                    src={img}
                    alt="image"
                    className='object-cover w-full h-full hover:scale-105 transition-transform duration-300 cursor-pointer'
                />
            </div>
            <p className='font-semibold text-white bg-black w-fit px-4 py-1 mt-3 rounded-full text-xs sm:text-sm'>
                {"@" + auther?.charAt(0).toUpperCase() + auther?.slice(1)}
            </p>
            <div className='flex justify-between items-center mt-2'>
                <div>
                    <h3 className='text-sm sm:text-base md:text-lg font-semibold'>{title}</h3>
                    <p className='text-gray-500 text-xs sm:text-sm'>Price: ${price}</p>
                </div>
                <div className='flex justify-center items-center gap-2 sm:gap-3'>
                    {icon1}
                    {icon2}
                </div>
            </div>
        </div>
    );
};

export default ImageCard;
