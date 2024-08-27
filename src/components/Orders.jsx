import React, { useEffect } from "react";
import orderSlice, { setOrders } from "../redux/Slices/orderSlice";
import DashBoardHeader from "../components/DashBoardHeader";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../Firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";

const Orders = () => {
  const userId = useSelector((state) => state.auth.user?.uid);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const role = useSelector((state) => state.auth.user?.accountType);

  const getOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "orders"));
      const orderData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? data.createdAt.toMillis() : null,
        };
      });
      console.log(orderData);
      dispatch(setOrders(orderData));
    } catch (error) {
      console.error("Error fetching orders data:", error);
    }
  };

  const getPurchased = async () => {
    try {
      const orderCollection = collection(firestore, "orders");
      const q = query(orderCollection, where("purchaserId", "==", userId));
      const querySnapshot = await getDocs(q);
      const orderData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? data.createdAt.toMillis() : null,
        };
      });
      console.log(orderData);
      dispatch(setOrders(orderData));
    } catch (error) {
      console.error("Error fetching purchased orders data:", error);
    }
  };

  useEffect(() => {
    if (role === "seller") {
      getOrders();
    } else {
      getPurchased();
    }
  }, [role]); 

  return (
    <div>
      <DashBoardHeader />
      <h1 className="text-2xl font-semibold mb-5 ml-8">Orders</h1>
      <table className="w-full sm:w-[80vw] bg-white rounded-lg shadow-md"></table>
      <div className="overflow-x-auto overflow-y-auto scrollbar-hide sm:ml-8"
      style={{ maxHeight: "550px" }}
      >
        <table className="w-full sm:w-[80vw] bg-white rounded-lg shadow-md">
          <thead>
            <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-1.5 sm:py-3 px-4 sm:px-6 text-left">Id</th>
              <th className="py-1.5 sm:py-3 px-4 sm:px-6 text-left">Item</th>
              <th className="py-1.5 sm:py-3 px-4 sm:px-6 text-left">
                {role === "seller" ? "Purchaser Name" : "Seller Name"}
              </th>
              <th className="py-1.5 sm:py-3 px-4 sm:px-6 text-left">Date</th>
              <th className="py-1.5 sm:py-3 px-4 sm:px-6 text-left">Price</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-1.5 sm:py-3 px-4 sm:px-6 text-left">{order.id}</td>
                <td className="py-1.5 sm:py-3 px-4 sm:px-6 text-left">{order.title}</td>
                <td className="py-1.5 sm:py-3 px-4 sm:px-6 text-left">
                  {role === "seller"
                    ? order.purchaserName
                      ? order.purchaserName.charAt(0).toUpperCase() + order.purchaserName.slice(1)
                      : "Unknown"
                    : order.userName
                    ? order.userName.charAt(0).toUpperCase() + order.userName.slice(1)
                    : "Unknown"}
                </td>
                <td className="py-1.5 sm:py-3 px-4 sm:px-6 text-left">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="py-1.5 sm:py-3 px-4 sm:px-6 text-right">${order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
