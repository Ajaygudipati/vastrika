import FeedbackSidebar from "../components/FeedbackSidebar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SocialMediaPopup from "../components/SocialMediaPopup";

const skirtData = [
  {
    id: 1,
    title: "Pleated Midi Skirt",
    price: 899,
    image: "/Assets/midiskirt1.png",
    category: "Casual",
  },
  {
    id: 2,
    title: "A-Line Skirt",
    price: 799,
    image: "/Assets/alineskirt1.png",
    category: "Office",
  },
  {
    id: 3,
    title: "Tiered Maxi Skirt",
    price: 1099,
    image: "/Assets/tiredmaxiskirt1.png",
    category: "Party Wear",
  },
  {
    id: 4,
    title: "Denim Skirt",
    price: 699,
    image: "/Assets/denim1.png",
    category: "Casual",
  },
  {
    id: 5,
    title: "Embroidered Skirt",
    price: 1299,
    image: "/Assets/embroidered1.png",
    category: "Party Wear",
  },
];

const categories = ["All", "Party Wear", "Office", "Casual"];

const SkirtsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredData, setFilteredData] = useState(skirtData);
  const [showForm, setShowForm] = useState(false);
  const [useLink, setUseLink] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredData(
      selectedCategory === "All"
        ? skirtData
        : skirtData.filter((item) => item.category === selectedCategory)
    );
  }, [selectedCategory]);

  const handleToggle = () => setShowForm(!showForm);

  return (
    <div className="min-h-screen bg-white font-[Montserrat] text-gray-800 relative">
        <FeedbackSidebar />
        <SocialMediaPopup />
      <div className={`${showForm ? "blur-md pointer-events-none" : ""} transition duration-300`}>

        {/* Sticky Header */}
        <header className="sticky top-0 bg-white z-50 border-b border-gray-200">
          <div className="text-center py-4">
            <h1
              className="text-3xl font-extrabold tracking-wide cursor-pointer text-gray-900"
              onClick={() => navigate("/services")}
            >
              VASTRIKA
            </h1>
          </div>
          <div className="flex justify-between items-center px-4 py-2">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-700 hover:text-black flex items-center"
            >
              <ArrowLeft className="mr-1" size={20} /> Back
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Skirts</h2>
            <div className="w-24" />
          </div>
        </header>

        {/* Hero Section */}
        <div className="relative mx-4 mt-6 mb-10">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-black via-gray-900 to-gray-800 z-0" />
          <div className="absolute inset-0 rounded-2xl pointer-events-none z-10">
            <div className="w-full h-full bg-gradient-to-br from-pink-100/20 via-transparent to-purple-200/20 animate-pulse rounded-2xl" />
          </div>
          <div className="relative z-20 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-8 text-center overflow-hidden animate-fade-in-up">
            <h2 className="text-4xl font-extrabold text-white drop-shadow-md">
              <span className="relative inline-block animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
                ✨Skirts
              </span>
            </h2>
            <p className="text-lg mt-3 text-gray-100 font-medium">
              Graceful Cuts, Elegant Stitching — Made for You
            </p>
            <div className="absolute inset-0 rounded-2xl overflow-hidden z-0">
              <div className="absolute top-0 left-[-50%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-12 animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-3 px-4 overflow-x-auto mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap border ${
                selectedCategory === cat
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300"
              } transition`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-24">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="rounded-lg h-40 w-full object-cover mb-3"
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-2">Starts at ₹{item.price}</p>
              <button className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-900 transition">
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* Sticky Bottom Booking Bar */}
<div className="fixed bottom-4 left-0 w-full px-4 z-40">
  <div className="backdrop-blur-md bg-white/30 border border-white/40 text-black rounded-full flex justify-between items-center px-6 py-3 shadow-lg max-w-xl mx-auto transition duration-300">
    <span className="font-medium text-sm md:text-base">👗 Customize Your Skirts</span>
    <button
      onClick={handleToggle}
      className="bg-black text-white px-4 py-1 rounded-full hover:bg-gray-800 transition duration-300"
    >
      Start
    </button>
  </div>
</div>



        {/* Footer */}
<footer className="bg-slate-100 text-gray-700 py-10 px-6 mt-20">
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Vastrika</h3>
      <p className="text-sm">
        Elegant tailoring service for women. Blouses, frocks, alterations & more — delivered at your doorstep.
      </p>
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

  {/* Footer Bottom Text */}
<div className="max-w-6xl mx-auto mt-10 px-4 flex flex-col md:flex-row justify-between items-center md:items-start text-sm text-gray-600">
  {/* Left: Made with Love by Vastrika */}
  <div className="text-left">
    <div className="text-xl font-semibold text-pink-600 leading-snug">Made with ❤️</div>
    <div className="text-xl font-semibold text-rose-500">by Vastrika</div>
  </div>

  {/* Right: Copyright */}
  <div className="text-sm mt-4 md:mt-0 text-gray-500">
    &copy; {new Date().getFullYear()} Vastrika. All rights reserved.
  </div>
</div>

</footer>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: "100vh" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100vh" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-lg z-50 flex items-center justify-center"
          >
            <div className="bg-white text-black rounded-3xl shadow-xl p-8 w-full max-w-2xl mx-auto relative">
              <button
                onClick={handleToggle}
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-6">Customize Your Skirt</h2>
              <form className="space-y-4">
                <div>
                  <label className="block font-medium">Name</label>
                  <input type="text" className="w-full border rounded-lg px-4 py-2 mt-1" />
                </div>
                <div>
                  <label className="block font-medium">Mobile Number</label>
                  <input type="tel" className="w-full border rounded-lg px-4 py-2 mt-1" />
                </div>
                <div className="flex items-center gap-4 mb-2">
                  <label className="font-medium">Reference via:</label>
                  <button type="button" onClick={() => setUseLink(true)} className={`px-3 py-1 rounded-full text-sm border ${useLink ? "bg-black text-white" : "text-black"}`}>
                    Link
                  </button>
                  <button type="button" onClick={() => setUseLink(false)} className={`px-3 py-1 rounded-full text-sm border ${!useLink ? "bg-black text-white" : "text-black"}`}>
                    Upload
                  </button>
                </div>
                {useLink ? (
                  <div>
                    <label className="block font-medium">Reference Image Link</label>
                    <input type="url" className="w-full border rounded-lg px-4 py-2 mt-1" />
                  </div>
                ) : (
                  <div>
                    <label className="block font-medium">Upload Reference Image</label>
                    <input type="file" accept="image/*" className="w-full mt-1" />
                  </div>
                )}
                <div>
                  <label className="block font-medium">Description</label>
                  <textarea rows={3} className="w-full border rounded-lg px-4 py-2 mt-1"></textarea>
                </div>
                <button type="submit" className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-900 transition">
                  Submit Request
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkirtsPage;
