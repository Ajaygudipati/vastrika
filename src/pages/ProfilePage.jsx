import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Pencil } from 'lucide-react';
import SocialMediaPopup from "../components/SocialMediaPopup";
import { Link } from 'react-router-dom';

const services = ["Blouses", "Dresses", "Skirts", "Frocks", "Tops and Pants", "Sarees", "Kids", "Alteration"];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: ""
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        const address = data.display_name || `${latitude}, ${longitude}`;

        setForm((prev) => ({
          ...prev,
          address: address,
        }));

        const mapFrame = document.getElementById("map-frame");
        if (mapFrame) {
          mapFrame.src = `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`;
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Failed to retrieve location.');
      }
    );
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("vastrikaUser"));
    if (storedUser) {
      setUser(storedUser);
      setForm(prev => ({
        ...prev,
        name: storedUser.name || "",
        email: storedUser.email || ""
      }));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("vastrikaUser", JSON.stringify({ ...user, ...form }));
    alert("Profile updated!");
  };

  return (
    <div className="min-h-screen bg-white text-black font-montserrat pt-32 relative">
            <SocialMediaPopup />

      <>
  {/* Inline marquee style */}
  <style>
    {`
      @keyframes marquee {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }

      .animate-marquee {
        display: inline-block;
        min-width: 100%;
        animation: marquee 15s linear infinite;
      }
    `}
  </style>

  {/* Scrolling Marquee */}
  <div className="fixed top-0 w-full bg-black text-white z-50 overflow-hidden h-8 flex items-center">
    <div className="animate-marquee font-bold text-sm tracking-wider px-4 whitespace-nowrap">
      An Aiónios Product - Vastrika • An Aiónios Product - Vastrika • An Aiónios Product - Vastrika • An Aiónios Product - Vastrika
    </div>
  </div>
</>


      {/* Header */}
      <header className="bg-white shadow-sm fixed top-8 left-0 right-0 z-40">
        <div className="text-center py-3 border-b border-gray-200">
          <h1
            className="text-3xl font-extrabold tracking-wide text-gray-900 cursor-pointer"
            onClick={() => navigate('/')}
          >
            VASTRIKA
          </h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-8">
            {user && (
              <div className="text-sm font-medium text-gray-800">
                Hello, {user.name}
              </div>
            )}
            <nav className="flex gap-6 items-center">
              <button
                className="hover:text-pink-500 transition font-semibold text-gray-900"
                onClick={() => navigate('/')}
              >
                Home
              </button>
              <div className="relative group cursor-pointer">
                <div className="flex items-center gap-1 font-semibold py-2 text-gray-900 hover:text-pink-500 transition-colors">
                  <span>Women</span>
                  <ChevronDown size={16} />
                </div>
                <ul className="absolute left-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-200 ease-in-out pointer-events-none group-hover:pointer-events-auto z-50 py-2">
                  {services.map(service => (
                    <li key={service}>
                      <a
                        href={`/services/${service.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 hover:bg-pink-100 text-gray-900 transition-colors duration-150"
                      >
                        {service}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className="hover:text-pink-500 font-semibold transition text-gray-900"
                onClick={() => navigate('/about')}
              >
                About
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="relative inline-block"
              onMouseEnter={() => clearTimeout(window.closeDropdownTimer)}
              onMouseLeave={() => {
                window.closeDropdownTimer = setTimeout(() => setIsOpen(false), 200);
              }}
            >
              <span
                className="text-gray-900 font-bold cursor-pointer hover:text-pink-600 transition"
                onClick={() => setIsOpen(!isOpen)}
              >
                {user?.name}
              </span>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 shadow-md rounded-md z-50 py-2">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition text-gray-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile Form Glass Block */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 mt-6 grid md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-2xl border border-gray-200">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-3 flex items-center justify-center text-3xl font-bold text-gray-700">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <h2 className="text-3xl font-bold mb-2">Your Profile</h2>
            <p className="text-sm text-gray-500">Edit your details below</p>
          </div>

          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-xl focus:outline-none"
              />
              <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              disabled
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-xl text-gray-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-semibold mb-1">Phone Number</label>
            <div className="relative">
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-xl focus:outline-none"
              />
              <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            </div>
          </div>

          {/* DOB */}
          <div>
            <label className="block font-semibold mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              onFocus={() => setIsCalendarOpen(true)}
              onBlur={() => setTimeout(() => setIsCalendarOpen(false), 300)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Right Column - Address + Map + Save */}
        <div className="flex flex-col justify-between gap-6">
          <div>
            <label className="block font-semibold mb-1">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-xl resize-none"
            />
            <button
              onClick={handleGetLocation}
              className="mt-3 text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              📍 Get Current Location
            </button>
          </div>

          <iframe
            id="map-frame"
            className="w-full h-[220px] rounded-xl border border-gray-300 shadow-lg"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(form.address)}&output=embed`}
          />

          <button
            onClick={handleSave}
            className="w-full py-3 bg-black hover:bg-gray-900 rounded-xl text-white font-semibold transition mt-4"
          >
            💾 Save Profile
          </button>
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
        </div>
        
      </div>
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
  );
};

export default ProfilePage;
