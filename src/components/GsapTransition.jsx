import React, { useEffect } from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import SellerDashboard from "../pages/SellerDashboard";
import BuyerDashboard from "../pages/BuyerDashboard";
import { Route, Routes, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useRef } from "react";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoute";

const GsapTransition = () => {
  const nodeRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (nodeRef.current) {
      gsap.fromTo(nodeRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
    }
  }, [location]);

  return (
    <div ref={nodeRef}>
      <Toaster />
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<ProtectedRoute children={<Login />} requiresAuth={false} />}
        />
        <Route
          path="/Signup"
          element={
            <ProtectedRoute children={<Signup />} requiresAuth={false} />
          }
        />
        <Route
          path="/buyer/profile"
          element={<ProtectedRoute children={<BuyerDashboard />} />}
        />
        <Route
          path="/seller/profile"
          element={<ProtectedRoute children={<SellerDashboard />} />}
        />
        
      </Routes>
    </div>
  );
};

export default GsapTransition;
