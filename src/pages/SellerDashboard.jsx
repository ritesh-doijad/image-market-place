import React from 'react'
import DashBoardSidebar from '../components/DashBoardSidebar'
import PhotoManagement from '../components/PhotoManagement'

const SellerDashboard = () => {
  return (
    <div className='flex flex-col sm:flex-row '>
      <DashBoardSidebar/>
      {/*  */}
      <PhotoManagement/>
    </div>
    
  )
}

export default SellerDashboard