import React from "react";
import DashBoardSidebar from "../components/DashBoardSidebar";
import Orders from "../components/Orders";
import Analytics from "../components/Analytics";
import PhotosPurchased from "../components/PhotosPurchased";
import { useSelector } from "react-redux";
import Favorites from "./Favorites";

const BuyerDashboard = () => {
  const tab = useSelector((state) => state.nav.tab);
  const renderContent = () => {
    switch (tab) {
      case "photo-purchased":
        return <PhotosPurchased />;
      case "analytics":
        return <Analytics />;
      case "orders":
        return <Orders />;
      case "favourites":
        return <Favorites/>;
      default:
        return <PhotosPurchased />;
    }
  };
  return (
    <div className="flex flex-col sm:flex-row ">
      <DashBoardSidebar />
      <div>{renderContent()}</div>
    </div>
  );
};

export default BuyerDashboard;
