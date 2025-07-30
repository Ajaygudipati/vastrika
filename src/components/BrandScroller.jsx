import React from "react";
import { motion } from "framer-motion";

const text = `
✂️ Vastrika — Crafted Elegance 👗 · Premium Tailoring ✨ · Custom Fittings 📏 · Timeless Stitching 🧵 · Personalized Styles 👚 · Traditional Meets Modern 🌸 ·
`;

const BrandScroller = () => {
  return (
    <div className="w-full bg-black overflow-hidden py-3 border-t border-gray-800">
      <motion.div
        className="flex whitespace-nowrap text-sm sm:text-base md:text-lg font-medium text-white tracking-wide"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
      >
        <div className="flex-shrink-0 px-10">{text}</div>
        <div className="flex-shrink-0 px-10">{text}</div>
      </motion.div>
    </div>
  );
};

export default BrandScroller;
