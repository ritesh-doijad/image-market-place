import React, { useEffect, useState } from "react";
import DashBoardHeader from "./DashBoardHeader";
import { useLocation } from "react-router-dom";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ExpenseCard from "./ExpenseCard";
import { useSelector } from "react-redux";
import { firestore } from "../Firebase/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Analytics = () => {
  const role = useSelector((state) => state.auth.user?.accountType);
  const userId = useSelector((state) => state.auth.user?.uid);
  const { pathname } = useLocation();

  const [tillNow, setTillNow] = useState([]);
  const [thisYear, setThisYear] = useState([]);
  const [thisMonth, setThisMonth] = useState([]);
  const [thisWeek, setThisWeek] = useState([]);

  const getPostsByDateRange = async () => {
    const postsCollection = collection(firestore, "posts");

    try {
      const postsQuery = query(
        postsCollection,
        role === "seller"
          ? where("userId", "==", userId)
          : where("purchasedBy", "array-contains", userId)
      );

      const querySnapshot = await getDocs(postsQuery);

      if (querySnapshot.empty) {
        setTillNow([]);
        setThisYear([]);
        setThisMonth([]);
        setThisWeek([]);
        return;
      }

      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const postsThisYear = posts.filter(
        (post) => new Date(post.createdAt.toDate()) >= startOfYear
      );
      const postsThisMonth = posts.filter(
        (post) => new Date(post.createdAt.toDate()) >= startOfMonth
      );
      const postsThisWeek = posts.filter(
        (post) => new Date(post.createdAt.toDate()) >= startOfWeek
      );

      setTillNow(posts);
      setThisYear(postsThisYear);
      setThisMonth(postsThisMonth);
      setThisWeek(postsThisWeek);
    } catch (error) {
      console.error("Failed to fetch posts by date range:", error);
    }
  };

  const calculateTotal = (posts) => {
    const total = posts.reduce((sum, post) => {
      const price = post.price || 0;
      const multiplier = role === "seller" ? (post.purchasedBy ? post.purchasedBy.length : 0) : 1;
      return sum + price * multiplier;
    }, 0);
    return total;
  };

  useEffect(() => {
    getPostsByDateRange();
  }, [role]);

  return (
    <div>
      <DashBoardHeader />
      <h1 className="text-2xl font-semibold mb-5 ml-8">Analytics</h1>
      <h2 className="text-2xl font-semibold my-5 ml-8">
        {pathname === "/seller/profile" ? "Uploaded" : "Purchased"} This Year
      </h2>
      <div className="w-[83vw] sm:w-[80vw] ml-8 p-2 bg-white rounded-2xl shadow-md flex flex-col justify-between items-center gap-5">
        <ResponsiveContainer width="100%" height={150}>
          <LineChart margin={{ top: 20, bottom: 0, left: -61 }} data={thisYear}>
            <XAxis dataKey="title" hide />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
        <p>
          Total {pathname === "/seller/profile" ? "Earned" : "Spent"}: $
          {calculateTotal(thisYear)}
        </p>
      </div>
      {!thisMonth.length ? (
        <h1 className="text-2xl font-semibold my-5 ml-8">No data available</h1>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between gap-2 mb-10">
          <ExpenseCard
            data={thisMonth}
            title={`${role === "seller" ? "Earned" : "Spent"} This Month`}
            dataKey="price"
            value={calculateTotal(thisMonth)}
          />
          <ExpenseCard
            data={thisWeek}
            title={`${role === "seller" ? "Earned" : "Spent"} This Week`}
            dataKey="price"
            value={calculateTotal(thisWeek)}
          />
          <ExpenseCard
            data={tillNow}
            title={`${role === "seller" ? "Earned" : "Spent"} Till Now`}
            dataKey="price"
            value={calculateTotal(tillNow)}
          />
        </div>
      )}
    </div>
  );
};

export default Analytics;
