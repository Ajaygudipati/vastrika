import React, { useEffect } from "react";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "./FloatingTailorIcons.css";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ServicesPage from "./pages/ServicesPage";
import BlousesPage from "./pages/BlousesPage";
import DressesPage from "./pages/DressesPage";
import ScrollToTop from './components/ScrollToTop';
import SkirtsPage from './pages/SkirtsPage';
import FrocksPage from './pages/FrocksPage';
import TopsAndPantsPage from "./pages/TopsAndPantsPage";
import ProfilePage from "./pages/ProfilePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // ✅ Import your AuthProvider


function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  useEffect(() => {
  if (window.location.pathname !== '/services') {
    AOS.init({ duration: 1000 });
  }
}, []);


  return (
    <AuthProvider>
      <Router>
        {/* 👇 This will make sure scroll resets to top on route change */}
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/services/blouses" element={<BlousesPage />} />
          <Route path="/services/dresses" element={<DressesPage />} />
          <Route path="/services/skirts" element={<SkirtsPage />} />
          <Route path="/services/frocks" element={<FrocksPage />} />
          <Route path="/services/tops-and-pants" element={<TopsAndPantsPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
