import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Slab } from "react-loading-indicators";
import FeedbackSidebar from "../components/FeedbackSidebar";
import BrandScroller from "../components/BrandScroller";
import SocialMediaPopup from "../components/SocialMediaPopup";


const ServicesPage = () => {
  const navigate = useNavigate();
  const services = ["Blouses", "Dresses", "Skirts", "Frocks", "Tops and Pants", "Sarees", "Kids", "Alteration"];
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("vastrikaUser")));
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const images = ['/Assets/girl1.jpg','/Assets/girl3.jpg','/Assets/girl4.jpg','/Assets/girl2.jpg'];

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceCategories = [
    { name: 'Blouses', images: ['/Assets/blouses1.png', '/Assets/blouses2.png', '/Assets/blouses3.png', '/Assets/blouses4.jpg'] },
    { name: 'Dresses', images: ['/Assets/dresses1.jpg', '/Assets/dresses2.jpg','/Assets/dresses3.jpg'] },
    { name: 'Skirts', images: ['/Assets/skirts1.jpg', '/Assets/skirts2.png', '/Assets/skirts3.png'] },
    { name: 'Frocks', images: ['/Assets/frocks1.png', '/Assets/frocks2.png', '/Assets/frocks3.png'] },
    { name: 'Tops and Pants', images: ['/Assets/tops1.png', '/Assets/tops2.png'] },
    { name: 'Sarees', images: ['/Assets/sarees1.png', '/Assets/sarees2.png'] },
    { name: 'Kids', images: ['/Assets/kids1.jpg', '/Assets/kids2.jpg', '/Assets/kids3.jpg']},
    { name: 'Alteration', images: ['/Assets/alteration1.png', '/Assets/alteration2.png'] },
    { name: 'Others', images: ['/Assets/others.png'] },
  ];

  const [imageIndices, setImageIndices] = useState(serviceCategories.map(() => 0));
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndices(prev => prev.map((idx, i) => (idx + 1) % serviceCategories[i].images.length));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleServiceClick = (category) => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/services/${category.toLowerCase().replace(/\s+/g, '-')}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-50 font-montserrat text-gray-800">
      <FeedbackSidebar />
      <SocialMediaPopup />


      {loading && (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
          <Slab size={50} color="#000" text="Loading services..." textColor="#000" />
        </div>
      )}

      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
          <div className="text-center py-3 border-b border-gray-200">
            <h1
              className="text-3xl font-extrabold tracking-wide text-gray-800 cursor-pointer"
              onClick={() => navigate('/')}
            >
              VASTRIKA
            </h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-8">
              {user && <div className="text-sm font-medium text-gray-700">Hello, {user.name}</div>}
              <nav className="flex gap-6 items-center">
                <button className="hover:text-pink-500 transition font-semibold" onClick={() => navigate('/')}>Home</button>
                <div className="relative group cursor-pointer">
                  <div className="flex items-center gap-1 font-semibold py-2">
                    <span className="hover:text-pink-500 transition-colors">Women</span>
                    <ChevronDown size={16} />
                  </div>
                  <ul className="absolute left-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-200 ease-in-out pointer-events-none group-hover:pointer-events-auto z-50 py-2">
                    {services.map(service => (
                      <li key={service}>
                        <Link
                          to={`/services/${service.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
                          className="block px-4 py-2 hover:bg-pink-100 text-gray-800 transition-colors duration-150"
                        >
                          {service}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="hover:text-pink-500 font-semibold transition" onClick={() => navigate('/about')}>About</button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <div
                  className="relative inline-block"
                  onMouseEnter={() => clearTimeout(window.closeDropdownTimer)}
                  onMouseLeave={() => {
                    window.closeDropdownTimer = setTimeout(() => setIsOpen(false), 200);
                  }}
                >
                  <span
                    className="text-gray-700 font-bold cursor-pointer hover:text-pink-600 transition"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {user.name}
                  </span>
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 shadow-md rounded-md z-50 py-2">
                      <a href="/profile" className="block px-4 py-2 hover:bg-gray-100 transition">View Profile</a>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="block bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="pt-[150px] px-6 max-w-8xl mx-auto">
          <div className="relative overflow-hidden w-full max-w-[1440px] h-[550px] mx-auto mb-16 rounded-xl shadow-lg">
            <AnimatePresence mode="wait">
              <motion.img
                key={images[currentImage]}
                src={images[currentImage]}
                alt={`slide-${currentImage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            {showScrollIndicator && (
              <div className="absolute bottom-6 inset-x-0 mx-auto z-10 flex flex-col items-center animate-bounce pointer-events-none w-max">
                <span className="text-white text-sm font-medium tracking-wide">Scroll down</span>
                <svg className="w-5 h-5 mt-1 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-10">
            {serviceCategories.map((category, idx) => (
              <motion.div
                key={category.name}
                className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleServiceClick(category.name)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6}}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <div className="relative w-full h-52 overflow-hidden rounded-t-xl">
                  <motion.div
                    key={imageIndices[idx]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className="absolute top-0 left-0 w-full h-full"
                  >
                    <img
                      src={category.images[imageIndices[idx]]}
                      alt={`${category.name}-${imageIndices[idx]}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
                <div className="text-center font-semibold text-lg py-4 bg-slate-50">
                  {category.name}
                </div>
              </motion.div>
            ))}
          </div>
        </main>

        
            <BrandScroller />
        <footer className="bg-slate-100 text-gray-700 py-10 px-6 mt-20 relative overflow-hidden">
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Vastrika</h3>
      <p className="text-sm">Elegant tailoring service for women...</p>
    </div>
    <div>
      <h4 className="font-semibold mb-2">Services</h4>
      <ul className="text-sm space-y-1">
        <li>Blouse Stitching</li>
        <li>Long Frocks</li>
        <li>Skirts</li>
        <li>Alterations</li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-2">Contact Us</h4>
      <p className="text-sm">Phone: +91 9182984259</p>
      <p className="text-sm">Email: vastrikain@gmail.com</p>
    </div>
  </div>

  <div className="text-center text-xs text-gray-500 mt-10 relative z-10">
    &copy; {new Date().getFullYear()} Vastrika. All rights reserved. Made with ❤️ by Vastrika.
  </div>

  {/* 🌊 Watermark Overlay for Footer */}
  <div className="absolute inset-0 flex items-end justify-center pb-6 pointer-events-none select-none opacity-10 text-[50px] sm:text-[80px] md:text-[100px] font-extrabold text-gray-400 whitespace-nowrap tracking-widest z-0">
    An Aiónios Product...
  </div>
</footer>

      </div>
    </div>
  );
};

export default ServicesPage;
