import React, { useEffect, useMemo, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import gsap from "gsap";
import { Toaster } from "react-hot-toast";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import SellerDashboard from "../pages/SellerDashboard";
import BuyerDashboard from "../pages/BuyerDashboard";
import ProtectedRoute from "./ProtectedRoute";

const GsapTransition = () => {
  const nodeRef = useRef(null);
  const location = useLocation();

  // Debounced animation to avoid firing too often on location change
  useEffect(() => {
    if (nodeRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          nodeRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" }
        );
      }, nodeRef);
      
      // Clean up animation context
      return () => ctx.revert();
    }
  }, [location]);

  // Memoize routes to avoid unnecessary recalculations on every render
  const routes = useMemo(
    () => (
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<ProtectedRoute requiresAuth={false}><Login /></ProtectedRoute>}
        />
        <Route
          path="/signup"
          element={<ProtectedRoute requiresAuth={false}><Signup /></ProtectedRoute>}
        />
        <Route
          path="/buyer/profile"
          element={<ProtectedRoute requiresAuth={true}><BuyerDashboard /></ProtectedRoute>}
        />
        <Route
          path="/seller/profile"
          element={<ProtectedRoute requiresAuth={true}><SellerDashboard /></ProtectedRoute>}
        />
      </Routes>
    ),
    [location]
  );

  return (
    <React.Fragment>
      <Toaster />
      <div ref={nodeRef}>
        {routes}
      </div>
    </React.Fragment>
  );
};

export default GsapTransition;
