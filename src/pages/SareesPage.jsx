import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FeedbackSidebar from "../components/FeedbackSidebar";
import SocialMediaPopup from "../components/SocialMediaPopup";

const sareeData = [
  {
    id: 1,
    title: "Pico Stitching",
    price: 99,
    image: "/Assets/pico.jpg",
    category: "Finishing",
  },
  {
    id: 2,
    title: "Falls Attachment",
    price: 149,
    image: "/Assets/falls.jpg",
    category: "Finishing",
  },
  {
    id: 3,
    title: "Saree Roll Pressing",
    price: 79,
    image: "/Assets/pressing.jpg",
    category: "Ironing",
  },
  {
    id: 4,
    title: "Saree Knotting",
    price: 59,
    image: "/Assets/knotting.jpg",
    category: "End Work",
  },
  {
    id: 5,
    title: "Saree Edging",
    price: 129,
    image: "/Assets/edging.jpg",
    category: "Finishing",
  },
  {
    id: 6,
    title: "Tassel Addition",
    price: 199,
    image: "/Assets/tassel.jpg",
    category: "Customization",
  },
];

const categories = ["All", "Finishing", "Ironing", "End Work", "Customization"];

const SareesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredData, setFilteredData] = useState(sareeData);
  const [showForm, setShowForm] = useState(false);
  const [useLink, setUseLink] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredData(sareeData);
    } else {
      setFilteredData(sareeData.filter((item) => item.category === selectedCategory));
    }
  }, [selectedCategory]);

  const handleToggle = () => setShowForm(!showForm);

  return (
    <div className="min-h-screen bg-white font-[Montserrat] text-gray-800 relative">
      <FeedbackSidebar />
      <SocialMediaPopup />
      <div className={`${showForm ? "blur-md pointer-events-none" : ""} transition duration-300`}>
        <header className="sticky top-0 bg-white z-50 border-b border-gray-200">
          <div className="text-center py-4">
            <h1 className="text-3xl font-extrabold tracking-wide cursor-pointer text-gray-900" onClick={() => navigate("/services")}>VASTRIKA</h1>
          </div>
          <div className="flex justify-between items-center px-4 py-2">
            <button onClick={() => navigate(-1)} className="text-gray-700 hover:text-black flex items-center">
              <ArrowLeft className="mr-1" size={20} /> Back
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Saree Services</h2>
            <div className="w-24" />
          </div>
        </header>

        <div className="relative mx-4 mt-6 mb-10">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-black via-gray-900 to-gray-800 z-0" />
          <div className="absolute inset-0 rounded-2xl pointer-events-none z-10">
            <div className="w-full h-full bg-gradient-to-br from-pink-100/20 via-transparent to-purple-200/20 animate-pulse rounded-2xl" />
          </div>
          <div className="relative z-20 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-8 text-center overflow-hidden animate-fade-in-up">
            <h2 className="text-4xl font-extrabold text-white drop-shadow-md relative z-10">
              <span className="relative inline-block animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
                ✨Sarees
              </span>
            </h2>
            <p className="text-lg mt-3 text-gray-100 font-medium z-10 relative translate-x-2">
              Stitching & Care Services for your Sarees
            </p>
            <div className="absolute inset-0 rounded-2xl overflow-hidden z-0">
              <div className="absolute top-0 left-[-50%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-12 animate-shimmer"></div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 px-4 overflow-x-auto mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap border ${
                selectedCategory === cat ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300"
              } transition`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-24">
          {filteredData.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-2">Starts at ₹{item.price}</p>
              <button className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-900 transition">Book Now</button>
            </div>
          ))}
        </div>

        {/* Remaining footer & form are unchanged */}
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
              <button onClick={handleToggle} className="absolute top-4 right-4 text-gray-600 hover:text-black">✕</button>
              <h2 className="text-2xl font-bold mb-6">Customize Your Saree</h2>
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
                  <button type="button" onClick={() => setUseLink(true)} className={`px-3 py-1 rounded-full text-sm border ${useLink ? "bg-black text-white" : "text-black"}`}>Link</button>
                  <button type="button" onClick={() => setUseLink(false)} className={`px-3 py-1 rounded-full text-sm border ${!useLink ? "bg-black text-white" : "text-black"}`}>Upload</button>
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
                <button type="submit" className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-900 transition">Submit Request</button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SareesPage;
