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



function HomePage() {
  const [user, setUser] = useState(null);
   const navigate = useNavigate();

/*useEffect(() => {
  if (!window.UnicornStudio) {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
    script.onload = () => {
      if (!window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    };
    document.body.appendChild(script);
  } else if (!window.UnicornStudio.isInitialized) {
    window.UnicornStudio.init();
    window.UnicornStudio.isInitialized = true;
  }
}, []);*/


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
      {/* Header Navigation */}
        <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
            <div className="relative max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <a
            href="#top"
            className="text-2xl font-bold text-gray-900 hover:text-pink-600 transition"
          >
            Vastrika
          </a>
          {/* Toggle button for small screens */}
<div className="md:hidden">
  <button
    onClick={() => setShowDropdown(!showDropdown)}
    className="text-gray-800 focus:outline-none"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
</div>

{/* Desktop Nav */}
<nav className="hidden md:flex items-center space-x-6 text-sm text-gray-700 font-medium relative">
  <a href="#about" className="hover:text-pink-600 font-bold transition">About Us</a>
  <a href="#howitworks" className="hover:text-pink-600 font-bold transition">How It Works</a>
  <a href="#services" className="hover:text-pink-600 font-bold transition">Services</a>
  <a href="#book" className="hover:text-pink-600 font-bold transition">Book Now</a>
  <a href="#footer" className="hover:text-pink-600 font-bold transition">Contact</a>

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
        <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
          View Profile
        </a>
        <button
          onClick={() => {
            localStorage.removeItem("vastrikaUser"); // ✅ Updated key
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

</nav>

{/* Mobile Dropdown Nav - Visible only on small screens */}
{showDropdown && (
  <div className="md:hidden absolute right-4 top-full mt-2 bg-white shadow-lg rounded-lg p-4 z-50 space-y-2 text-sm">
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
            localStorage.removeItem("user");
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

    <main className="pt-5">
        <div id="top"></div>

        {/* Hero Section */}
        <section
          data-aos="fade-down"
          className="relative py-24 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between overflow-hidden gap-8"
        >
          {/* Left Text */}
          <div className="max-w-xl z-10 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Vastrika
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-700">
              Premium women’s tailoring at your doorstep. Elegant fits, hand-finished with love.
            </p>
            <a href="#book">
  <button className="mt-8 bg-gray-800 text-white px-6 py-3 rounded-full text-lg hover:bg-gray-900 transition-all shadow-md">
    Book a Stitch
  </button>
</a>

          </div>

          {/* Right Image */}
          {/* Right Image Section */}
          <div className="mt-12 md:mt-0 md:ml-10 z-10" data-aos="zoom-in">
            <div className="relative w-[280px] sm:w-[320px] md:w-[420px] h-[380px] sm:h-[420px]">

              {/* Floating Tailoring Icons */}
              <img
                src="/Assets/scissors.png"
                className="floating-icon absolute w-[18%] top-[-5%] left-[45%]"
                alt="Scissors"
              />
              <img
                src="/Assets/threads.png"
                className="floating-icon absolute w-[18%] top-[20%] left-[95%]"
                alt="Thread Spool"
              />
              <img
                src="/Assets/tape.png"
                className="floating-icon absolute w-[20%] top-[25%] left-[0%]"
                alt="Measuring Tape"
              />
              <img
                src="/Assets/button.png"
                className="floating-icon absolute w-[18%] top-[65%] left-[93%]"
                alt="Shirt Button"
              />
              <img
                src="/Assets/sewing.png"
                className="floating-icon absolute w-[20%] top-[40%] left-[45%]"
                alt="Sewing Machine"
              />
              <img
                src="/Assets/dress.png"
                className="floating-icon absolute w-[20%] top-[85%] left-[45%]"
                alt="Dress"
              />
              <img
                src="/Assets/bobbin.png"
                className="floating-icon absolute w-[18%] top-[68%] left-[0%]"
                alt="Bobbin"
              />

            </div>
          </div>


        </section>
        {/* About Us Section */}
        <section
          id="about"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          className="bg-white py-20 px-6 md:px-12 text-center"
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
          className="py-20 px-6 md:px-12 bg-white text-center"
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
          className="bg-gradient-to-b from-white to-slate-50 py-20 px-6 md:px-12 text-center"
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
  className="bg-gray-800 text-white font-semibold py-3 px-8 rounded-xl hover:bg-gray-900 transition-all"
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
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919182984259"
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all z-50"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.52 3.48A11.76 11.76 0 0012 0C5.37 0 0 5.38 0 12a11.8 11.8 0 001.63 6.01L0 24l6.33-1.66A11.85 11.85 0 0012 24c6.63 0 12-5.38 12-12 0-3.19-1.24-6.17-3.48-8.52zM12 22.06c-1.84 0-3.64-.5-5.2-1.44l-.37-.22-3.76.98.99-3.66-.24-.38A10.02 10.02 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10.06-10 10.06zm5.02-7.85c-.28-.14-1.65-.82-1.9-.91-.26-.1-.44-.14-.63.14-.19.28-.73.91-.9 1.1-.17.19-.33.21-.61.07-.28-.14-1.18-.43-2.25-1.37-.83-.74-1.39-1.66-1.56-1.94-.17-.28-.02-.43.13-.57.13-.13.28-.33.42-.5.14-.17.19-.28.28-.47.1-.19.05-.36-.02-.5-.07-.14-.63-1.52-.86-2.1-.23-.57-.46-.5-.63-.5-.16 0-.36-.02-.55-.02s-.5.07-.76.36c-.26.28-1 1-1 2.43 0 1.43 1.02 2.81 1.17 3.01.14.2 2.01 3.07 4.89 4.3.68.29 1.2.46 1.61.58.67.21 1.27.18 1.74.11.53-.08 1.65-.67 1.88-1.31.23-.64.23-1.2.16-1.31-.08-.1-.25-.17-.53-.3z" />
          </svg>
        </a>
        {/* Instagram Button (above WhatsApp) */}
<a
  href="https://instagram.com"
  className="fixed bottom-24 right-6 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 hover:brightness-110 text-white p-4 rounded-full shadow-lg transition-all z-50"
  target="_blank"
  rel="noopener noreferrer"
  title="Instagram"
>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
    alt="Instagram"
    className="w-6 h-6"
  />
</a>


        {/* Footer */}
        <footer
          data-aos="flip-left"
          id="footer"
          className="bg-slate-100 text-gray-700 py-10 px-6 mt-20"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Vastrika</h3>
              <p className="text-sm">Elegant tailoring service for women. Blouses, frocks, alterations & more — delivered at your doorstep.</p>
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
