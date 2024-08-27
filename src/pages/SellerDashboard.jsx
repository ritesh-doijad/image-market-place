import React from 'react';
import DashBoardSidebar from '../components/DashBoardSidebar';
import PhotoManagement from '../components/PhotoManagement';
import Analytics from '../components/Analytics';
import Orders from '../components/Orders';
import { useSelector } from 'react-redux';

const SellerDashboard = () => {
  const tab = useSelector((state) => state.nav.tab);

  const renderContent = () => {
    switch (tab) {
      case 'photo-management':
        return <PhotoManagement />;
      case 'analytics':
        return <Analytics />;
      case 'orders':
        return <Orders />;
      default:
        return <PhotoManagement />;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <DashBoardSidebar />
      <div>{renderContent()}</div>
    </div>
  );
};

export default SellerDashboard;
