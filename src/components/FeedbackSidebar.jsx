import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle, XCircle } from "lucide-react";

const serviceCategories = [
  "Blouse Stitching",
  "Dress Tailoring",
  "Alterations",
  "Fitting",
  "Overall Experience",
];

const FeedbackSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ratings, setRatings] = useState({});
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleRating = (category, value) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const totalFiles = images.length + selectedFiles.length;

    if (totalFiles > 5) {
      setUploadError(true);
      setTimeout(() => setUploadError(false), 3000);
      return;
    }

    setImages((prev) => [...prev, ...selectedFiles]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasRating = Object.values(ratings).some((r) => r > 0);

    if (images.length > 5) {
      setUploadError(true);
      setTimeout(() => setUploadError(false), 3000);
      return;
    }

    if (!hasRating && message.trim() === "") {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    console.log("Submitted feedback:", { ratings, message, images });

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsOpen(false);
    }, 3000);

    setRatings({});
    setMessage("");
    setImages([]);
  };

  return (
    <>
      {/* Floating Feedback Tab */}
      <button
        onClick={toggleSidebar}
        className="fixed top-1/2 -right-[46px] z-[1000] transform -translate-y-1/2 bg-black text-white px-3 py-2 rounded-tl-lg rounded-bl-lg cursor-pointer rotate-90 hover:bg-gray-800"
      >
        Feedback →
      </button>

      {/* Feedback Modal with Blur */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-xl p-6 overflow-y-auto max-h-[90vh] relative"
            >
              <button
                onClick={toggleSidebar}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold mb-4">We Value Your Feedback</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {serviceCategories.map((category) => (
                  <div key={category}>
                    <label className="block font-medium text-gray-800 mb-1">
                      {category}
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          type="button"
                          whileTap={{ scale: 1.4 }}
                          onClick={() => handleRating(category, star)}
                          className={`text-black ${
                            ratings[category] >= star
                              ? "fill-current"
                              : "opacity-30"
                          }`}
                        >
                          <Star
                            size={24}
                            fill="currentColor"
                            className="transition duration-300 ease-in-out"
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Image Upload */}
                <div>
                  <label className="block font-medium text-gray-800 mb-1">
                    Upload Product Images (Max 5)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-700"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {images.map((img, i) => (
                      <img
                        key={i}
                        src={URL.createObjectURL(img)}
                        alt={`upload-${i}`}
                        className="w-16 h-16 object-cover rounded border"
                      />
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label className="block font-medium text-gray-800 mb-1">
                    Additional Comments
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your feedback here..."
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
                >
                  Submit Feedback
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-xl flex items-center space-x-2 shadow-lg z-[1100]"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Feedback submitted successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ❌ Error Overlay - Empty feedback */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 bg-red-600 text-white px-4 py-3 rounded-xl flex items-center space-x-2 shadow-lg z-[1100]"
          >
            <XCircle className="w-5 h-5" />
            <span>Please provide feedback or ratings.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ❌ Error Overlay - File upload limit */}
      <AnimatePresence>
        {uploadError && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 bg-red-600 text-white px-4 py-3 rounded-xl flex items-center space-x-2 shadow-lg z-[1100]"
          >
            <XCircle className="w-5 h-5" />
            <span>You can upload only up to 5 images.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackSidebar;
