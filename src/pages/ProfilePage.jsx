import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Pencil } from 'lucide-react';
import DatePicker from "react-datepicker";

const services = ["Blouses", "Dresses", "Skirts", "Frocks", "Tops and Pants", "Sarees", "Kids", "Alteration"];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
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
  window.location.reload(); // Optional: refresh state
};
const [isCalendarOpen, setIsCalendarOpen] = useState(false);


const handleGetLocation = () => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      // Get readable address using reverse geocoding (Google Maps API or OpenStreetMap API)
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      const data = await res.json();

      const address = data.display_name || `${latitude}, ${longitude}`;

      setForm((prev) => ({
        ...prev,
        address: address,
      }));

      // Optionally update iframe map
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
    <div className="min-h-screen relative bg-black text-white font-montserrat pt-32">
      {/* Watermark Background */}
      <div className="fixed inset-0 z-0 text-white opacity-5 flex flex-col justify-center items-center pointer-events-none select-none text-6xl font-extrabold tracking-wider">
        <div>An Aiónios Product</div>
        <div className="text-5xl mt-6">Vastrika</div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
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

  {/* Profile Form Block */}
 <div className="relative min-h-screen bg-white text-black font-[Montserrat] overflow-hidden px-4 pb-10 ">

  {/* Watermark Background */}
  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20 select-none pointer-events-none z-0">
    <h1 className="text-[120px] font-extrabold tracking-wide text-gray-400 leading-none">An Aiónios Product...</h1>
    <p className="text-4xl font-semibold text-black-400 mt-2">Vastrika</p>
  </div>

  {/* Profile Block */}
  <div className="relative z-10 max-w-2xl mx-auto bg-transparent backdrop-blur-[5px] rounded-3xl border border-gray-300 p-10 shadow-2xl text-black mt-0">
    <h2 className="text-3xl font-bold mb-6 text-center">Your Profile</h2>

    <div className="space-y-6">
      {/* Name */}
      <div>
        <label className="block font-semibold mb-1">Full Name</label>
        <div className="relative">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-xl focus:outline-none text-black"
          />
          <Pencil className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block font-semibold mb-1">Email</label>
        <input
          type="email"
          value={form.email}
          disabled
          className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-xl text-gray-500"
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
            className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-xl focus:outline-none text-black"
          />
          <Pencil className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
        </div>
      </div>

      {/* DOB */}
<div className="relative z-50">
  <label className="block font-semibold mb-1 text-black">Date of Birth</label>
  <div className="relative">
    {/* 🔲 Full-screen blur overlay while calendar is open */}
    {isCalendarOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-[4px] z-40 transition-opacity duration-300"></div>
    )}

    <input
      type="date"
      name="dob"
      value={form.dob}
      onChange={handleChange}
      onFocus={() => setIsCalendarOpen(true)}
      onBlur={() => setTimeout(() => setIsCalendarOpen(false), 300)}
      className="w-full px-4 py-2 bg-white/10 border border-gray-300 rounded-xl shadow-lg text-black focus:outline-none backdrop-blur-lg z-50 relative"
      style={{
        WebkitBackdropFilter: "blur(10px)",
        backdropFilter: "blur(10px)",
      }}
    />

    <Pencil
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
      size={16}
    />
  </div>
</div>



      {/* Address Field with Get Location */}
<div className="relative">
  <label className="block font-semibold mb-1">Address</label>
  <textarea
    name="address"
    value={form.address}
    onChange={handleChange}
    className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-xl focus:outline-none text-black"
    rows={3}
  />
  <Pencil className="absolute right-3 mt-1 text-gray-500" size={16} />
</div>

{/* Get Current Location Button */}
<button
  onClick={handleGetLocation}
  type="button"
  className="mt-2 mb-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
>
  📍 Get Current Location
</button>

{/* Embedded Map Preview */}
<iframe
  id="map-frame"
  className="w-full h-[250px] rounded-xl mt-2"
  loading="lazy"
  allowFullScreen
  referrerPolicy="no-referrer-when-downgrade"
  src={`https://www.google.com/maps?q=${encodeURIComponent(form.address)}&output=embed`}
/>


      {/* Save Button */}
<button
  onClick={handleSave}
  className="w-full py-3 mt-4 bg-black text-white hover:bg-gray-800 rounded-xl font-semibold transition"
>
  Save Profile
</button>

    </div>
  </div>
</div>


        </div>
  );
};

export default ProfilePage;
