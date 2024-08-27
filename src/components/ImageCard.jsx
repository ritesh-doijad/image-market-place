import React from 'react'

const ImageCard = ({id,img,auther,title,price,icon1,icon2}) => {
    return (
        <div className='rounded-lg bg-white shadow-lg p-2'>
            <div className='w-full h-[200px] overflow-hidden rounded-2xl'>
                <img src={img} alt="image"
                    className='object-contain w-full h-full hover:scale-105 transition-all ease-linear duration-300 transform cursor-pointer' />
            </div>
            <p className='font-semibold text-white bg-black w-fit px-5 mt-3 py-1 rounded-full text-sm'>
                {"@"+ auther?.charAt(0).toUpperCase()+auther?.slice(1)}</p>
            <div className='flex justify-between items-center mt-2' >
                <div>
                    <h3 className='text-lg font-semibold'>{title}</h3>
                    <p className='text-gray-500'>Price : ${price}</p>
                </div>
                <div className='flex justify-center items-center gap-5'>
                    {icon1}
                    {icon2}
                </div>
            </div>
        </div>
    )
}

export default ImageCard