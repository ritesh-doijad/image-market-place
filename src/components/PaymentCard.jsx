import React from "react";

const PaymentCard = () => {
  return (
  <div className="w-full h-screen flex justify-center items-center bg-inherit">
    <div className="relative overflow-hidden w-72 h-[75vh] rounded-lg bg-white shadow-lg">
      <div className="bg-gradient-to-r from-[#54d5f3] to-[#45b2e0] p-2 flex items-center border-b-2 shadow-md">
        <img src="/imagemarketlogo.png" alt="" className="w-28" />
        <h2 className=" text-xl font-semibold ">IMAGE MARKET</h2>
      </div>
      <div className="absolute bottom-0 w-full flex justify-between shadow-md bg-white py-2">
        <div className="ml-3">
          <h2 className="text-2xl font-semibold">$20</h2>
          <p className="text-[12px] text-gray-500 font-medium cursor-pointer hover:underline">
            View Details
          </p>
        </div>
        <button className="px-12 text-lg font-semibold py-1.5 bg-gradient-to-r from-[#54d5f3] to-[#45b2e0] rounded-md mr-2 hover:opacity-90 transition-opacity">
          Pay Now
        </button>
      </div>
    </div>
  </div>
    
  );
};

export default PaymentCard;
