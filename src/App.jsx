import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GsapTransition from "./components/GsapTransition";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserData, logout } from "./redux/Slices/authSlice";
import { auth } from "./Firebase/Firebase";
import PaymentCard from "./components/PaymentCard";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                dispatch(fetchUserData(user.uid));
            } else {
                dispatch(logout());
            }
        });
        return () => unsubscribe();
    } else {
        dispatch(logout());
    }
}, [dispatch]);

  return (
  
    <>
      <Navbar />
      <GsapTransition />
      <Footer />
    </>
  );
}

export default App;
