import { lazy, Suspense, useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData, logout } from "./redux/Slices/authSlice";
import { auth } from "./Firebase/Firebase";

// Lazy load components to improve initial load time
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const GsapTransition = lazy(() => import("./components/GsapTransition"));

function App() {
  const dispatch = useDispatch();

  // Memoize token retrieval to avoid redundant calls
  const token = useMemo(() => localStorage.getItem('token'), []);

  // Optimize auth state change handling using useCallback
  const handleAuthStateChange = useCallback(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(fetchUserData(user.uid));
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      const unsubscribe = handleAuthStateChange();
      return () => unsubscribe();
    } else {
      dispatch(logout());
    }
  }, [token, handleAuthStateChange, dispatch]);

  return (
    <Suspense>
      <Navbar />
      <GsapTransition />
      <Footer />
    </Suspense>
  );
}

export default App;
