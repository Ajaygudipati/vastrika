import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../FloatingTailorIcons.css"; // adjust path if needed
import '../styles/CustomScrollbar.css';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Slab } from "react-loading-indicators";
import { ChevronDown, LogOut, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SocialMediaPopup from "../components/SocialMediaPopup";
import BrandScroller from "../components/BrandScroller";
import ServiceStepsTimeline from "../components/ServiceStepsTimeline";


function HomePage() {
  const [user, setUser] = useState(null);
   const navigate = useNavigate();

useEffect(() => {
  const storedUser = localStorage.getItem("vastrikaUser");

  // Check that storedUser is not null, not the string "undefined", and valid JSON
  if (storedUser && storedUser !== "undefined") {
    try {
      const parsedUser = JSON.parse(storedUser); // ✅ Safely parse
      setUser(parsedUser); // ✅ Set the parsed object
    } catch (err) {
      console.error("Error parsing stored user from localStorage:", err);
      setUser(null); // Optionally clear invalid user
    }
  } else {
    setUser(null); // Nothing in localStorage or it's invalid
  }
}, []);
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    document.title = "Vastrika – Tailoring at Your Doorstep";
  }, []);
  const [needlePos, setNeedlePos] = useState({ x: 0, y: 0 });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
  
    window.addEventListener("mousemove", handleMouseMove);
    
  
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-50 text-gray-800 font-montserrat">
      <SocialMediaPopup />
      {/* Desktop View - Sticky Left Timeline */}
<div className="hidden lg:fixed lg:top-[30%] lg:left-4 lg:z-50 lg:flex lg:flex-col items-start space-y-3 font-zeyada text-black text-[18px] pointer-events-none select-none">
  <div className="flex flex-col items-start">
    <h2 className="text-2xl font-bold underline decoration-2 underline-offset-4 mb-4 text-gray-800">
      How we work...
    </h2>
    <span className="whitespace-normal max-w-[200px] leading-snug">Book a Stitch</span>
    <span className="text-xl ml-2">↓</span>
  </div>
  <div className="flex flex-col items-start">
    <span className="whitespace-normal max-w-[200px] leading-snug">We collect fabric, measurements & preferences</span>
    <span className="text-xl ml-2">↓</span>
  </div>
  <div className="flex flex-col items-start">
    <span className="whitespace-normal max-w-[200px] leading-snug">Our expert tailors craft your perfect fit</span>
    <span className="text-xl ml-2">↓</span>
  </div>
  <div className="flex flex-col items-start">
    <span className="whitespace-normal max-w-[200px] leading-snug">We deliver your elegance to your doorstep</span>
  </div>
</div>


      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        
  {/* Top Centered Logo */}
  <div className="text-center py-4 border-b border-gray-200">
    <h1
      className="text-3xl font-extrabold tracking-wide text-gray-900 cursor-pointer"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      Vastrika
    </h1>
  </div>

  {/* Bottom Navigation Row */}
  <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
    {/* Left Navigation Links */}
    <nav className="hidden md:flex items-center space-x-6 text-sm text-gray-700 font-medium">
      <a href="#about" className="hover:text-pink-600 font-bold transition">About Us</a>
      <a href="#howitworks" className="hover:text-pink-600 font-bold transition">How It Works</a>
      <a href="#services" className="hover:text-pink-600 font-bold transition">Services</a>
      <a href="#book" className="hover:text-pink-600 font-bold transition">Book Now</a>
      <a href="#footer" className="hover:text-pink-600 font-bold transition">Contact</a>
    </nav>

    {/* Right Side Login/Profile Dropdown */}
    <div className="flex items-center gap-4">
      {user ? (
        <div className="relative inline-block">
          <span
            className="text-gray-700 font-bold cursor-pointer hover:text-pink-600 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {user.name}
          </span>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md z-50">
              <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">View Profile</a>
              <button
                onClick={() => {
                  localStorage.removeItem("vastrikaUser");
                  setUser(null);
                  window.location.reload();
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
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

  {/* Mobile Menu (unchanged) */}
  <div className="md:hidden px-4 pb-4">
    <button
      onClick={() => setShowDropdown(!showDropdown)}
      className="text-gray-800 focus:outline-none"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    {showDropdown && (
      <div className="mt-2 bg-white shadow-lg rounded-lg p-4 z-50 space-y-2 text-sm">
        <a href="#about" className="block hover:text-pink-600 font-semibold">About Us</a>
        <a href="#howitworks" className="block hover:text-pink-600 font-semibold">How It Works</a>
        <a href="#services" className="block hover:text-pink-600 font-semibold">Services</a>
        <a href="#book" className="block hover:text-pink-600 font-semibold">Book Now</a>
        <a href="#footer" className="block hover:text-pink-600 font-semibold">Contact</a>
        {user ? (
          <div className="space-y-1">
            <a href="/profile" className="block hover:text-pink-600">View Profile</a>
            <button
              onClick={() => {
                localStorage.removeItem("vastrikaUser");
                setUser(null);
                window.location.reload();
              }}
              className="block w-full text-left hover:text-pink-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <a
            href="/login"
            className="block bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
          >
            Login
          </a>
        )}
      </div>
    )}
  </div>
</header>


<main className="pt-[140px]">
  <div id="top"></div>

  {/* Hero Section */}
<section
  data-aos="fade-down"
  className="relative py-24 px-6 md:px-20 flex flex-col items-center justify-center overflow-hidden text-center"
  style={{
    backgroundImage: `url("../Assets/bg1.jpg")`, // ✅ Your image here
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat", // 🔁 added this to prevent repeating, just in case
  }}
>
  {/* Overlay for tint */}
  <div className="absolute inset-0 bg-black/40 z-0" />

  {/* Main Content */}
  <div className="z-10 max-w-3xl">
    <h1 className="text-6xl md:text-7xl font-extrabold tracking-wider text-white hero-3d">
      Vastrika
    </h1>

    <p className="mt-5 text-lg md:text-2xl text-white font-medium drop-shadow-md">
      <span className="typewriter">Premium women’s tailoring at your doorstep.</span>
    </p>
  </div>
</section>



  {/* Custom CSS */}
  <style>{`
    .typewriter {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      border-right: 2px solid #fff;
      animation: typing 4s steps(40, end), blink 0.75s step-end infinite;
    }

    @keyframes typing {
      from { width: 0 }
      to { width: 100% }
    }

    @keyframes blink {
      from, to { border-color: transparent }
      50% { border-color: white }
    }

    .hero-3d {
      color: #fff;
      text-shadow:
        0 1px 0 #ccc,
        0 2px 0 #bbb,
        0 3px 0 #aaa,
        0 4px 0 #999,
        0 5px 0 #888,
        0 6px 1px rgba(0,0,0,0.1),
        0 0 5px rgba(255,255,255,0.2),
        0 1px 3px rgba(0,0,0,0.3),
        0 3px 5px rgba(0,0,0,0.2),
        0 5px 10px rgba(0,0,0,0.25),
        0 10px 10px rgba(0,0,0,0.2),
        0 20px 20px rgba(0,0,0,0.15);
    }
  `}</style>
        {/* About Us Section */}
        <section
          id="about"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          className="bg-white py-20 px-6 md:px-12 text-center scroll-mt-[140px]"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About Us</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              <span className="font-semibold text-gray-800">Vastrika</span> is a premium doorstep tailoring service dedicated to women’s fashion. We believe that every outfit tells a story — your story. From everyday blouses to elegant frocks, our expert tailors ensure your garments are not only stitched to perfection but crafted with emotion and attention to detail.
            </p>
            <p className="text-gray-600 text-lg mt-4 leading-relaxed">
              We offer free doorstep pickup & delivery, consultation on design choices, and seamless communication to bring your dream outfit to life. With Vastrika, you don’t need to step out to get the perfect fit — we bring the boutique experience to your home.
            </p>
          </div>
        </section>
        {/* How It Works Section */}
        <section id="howitworks"
          data-aos="fade-up"
           className="py-20 px-6 md:px-12 bg-white text-center scroll-mt-[140px]"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
            {/* Step 1 */}
            <div data-aos="fade-up" data-aos-delay="100" className="flex flex-col items-center">
              <img src="/Assets/form.png" alt="Place Request" className="w-20 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Step 1: Place Your Request</h3>
              <p className="text-gray-600 text-sm">Fill out the form and upload a reference image or link of your desired style.</p>
            </div>

            {/* Step 2 */}
            <div data-aos="fade-up" data-aos-delay="200" className="flex flex-col items-center">
              <img src="/Assets/pickup.png" alt="Pickup" className="w-20 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Step 2: Pickup from Your Doorstep</h3>
              <p className="text-gray-600 text-sm">We collect your materials from home, hassle-free and safe.</p>
            </div>

            {/* Step 3 */}
            <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col items-center">
              <img src="/Assets/tailoring.png" alt="Tailoring" className="w-20 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Step 3: Expert Tailoring</h3>
              <p className="text-gray-600 text-sm">Our experienced tailors craft your design with perfect fit and finish.</p>
            </div>

            {/* Step 4 */}
            <div data-aos="fade-up" data-aos-delay="400" className="flex flex-col items-center">
              <img src="/Assets/delivery.png" alt="Delivery" className="w-20 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Step 4: Delivery & Fit Check</h3>
              <p className="text-gray-600 text-sm">Your stitched outfit is delivered back to you, ready to wear and impress.</p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          data-aos="fade-up"
          className="bg-gradient-to-b from-white to-slate-50 py-20 px-6 md:px-12 text-center scroll-mt-[140px]"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Our Services</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {
            [
              {
                title: "Blouses",
                desc: "Designer blouses stitched perfectly with your custom fit.",
                img: "https://img.icons8.com/color/48/needle.png",
              },
              {
                title: "Long Frocks",
                desc: "Flowing frocks tailored just the way you dreamt.",
                img: "/Assets/dress-frock.png"
              },
              {
                title: "Skirts",
                desc: "Classic and trendy skirts, stitched with precision.",
                img: "https://img.icons8.com/color/48/skirt.png",
              },
              {
                title: "Alterations",
                desc: "Quick fixes or complete reshaping — we do it all.",
                img: "https://img.icons8.com/color/48/sewing-machine.png",
              }
            ]
            
            .map((service, index) => (
              <div
                key={index}
                data-aos="fade-up"
                className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="mx-auto mb-4 w-12 h-auto"
                />
                <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Section */}
        {user ? (
  // 👇 Show Full Booking Form if user is logged in
<section id="book" data-aos="fade-up" className="bg-white py-20 px-6 md:px-12">
  <div className="max-w-3xl mx-auto bg-slate-100 p-10 rounded-3xl shadow-md text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Book a Stitching Request</h2>
    <p className="text-gray-600 mb-6">
      Click below to explore and book our stitching services tailored to your needs.
    </p>
    <button
  onClick={() => {
    navigate("/services");
    setTimeout(() => window.scrollTo(0, 0), 50);
  }}
  className="bg-black py-20 px-6 md:px-12 text-center scroll-mt-[140px] bg-gray-800 text-white font-semibold py-3 px-8 rounded-xl hover:bg-gray-900 transition-all"
>
  Book a Stitch
</button>

  </div>
</section>

) : (
  // 👇 If not logged in, show button to login
  <section id="book" data-aos="fade-up" className="bg-white py-20 px-6 md:px-12 text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Want to Book a Stitch?</h2>
    <Link to="/login">
      <button className="bg-gray-800 text-white font-semibold py-3 px-8 rounded-xl hover:bg-gray-900 transition-all">
        Login to Book
      </button>
    </Link>
  </section>
)}
{/* Mobile View - Bottom Timeline */}
<div className="block lg:hidden w-full px-6 py-10 bg-gray-50 mt-12 font-zeyada text-black text-[18px]">
  <h2 className="text-2xl font-bold underline decoration-2 underline-offset-4 mb-4 text-center">
    How we work...
  </h2>
  <div className="flex flex-col gap-3 items-center text-center leading-snug">
    <div>🧵 Book a Stitch</div>
    <div>⬇️</div>
    <div>📏 We collect fabric, measurements & preferences</div>
    <div>⬇️</div>
    <div>🧶 Our expert tailors craft your perfect fit</div>
    <div>⬇️</div>
    <div>🚚 We deliver your elegance to your doorstep</div>
  </div>
</div>


        {/* Footer */}
        <BrandScroller />
        <footer className="bg-slate-100 text-gray-700 py-10 px-6 mt-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
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
            <div>
              <h4 className="font-semibold mb-2">Follow Us</h4>
              <div className="flex space-x-4 mt-2">
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <img src="https://img.icons8.com/color/24/instagram-new--v1.png" alt="Instagram" />
                </a>
                <a href="https://wa.me/919182984259" target="_blank" rel="noreferrer">
                  <img src="https://img.icons8.com/color/24/whatsapp--v1.png" alt="WhatsApp" />
                </a>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500 mt-10">
            &copy; {new Date().getFullYear()} Vastrika. All rights reserved. Made with ❤️ by Vastrika.
          </div>
        </footer>
      </main>
{/* 🔥 Sticky Glassmorphic “Book a Stitch” Button */}
<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30 xl:z-50">
  <div className="backdrop-blur-xl bg-transparent border border-white/20 rounded-2xl px-6 py-4 flex flex-col items-center shadow-xl hover:scale-105 transition-transform duration-300">
    <span className="text-black text-sm tracking-wider mb-1 font-semibold">
      Vastrika
    </span>
    <Link to="/services">
      <button className="text-black text-lg font-semibold px-8 py-3 rounded-full bg-transparent hover:bg-white/10 border border-white/30 shadow-md backdrop-blur-xl transition-all duration-300">
        Book a Stitch
      </button>
    </Link>
  </div>
</div>


      {/* Needle Follows Mouse */}
        <img
        src="/Assets/needle.png"
        alt="Needle"
        className="needle-follow"
        style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transform: "translate(-50%, -50%)",
            transition: "transform 0.1s linear",
        }}
        />
    </div>
  );
}

export default HomePage;
