import React, { useState } from "react";
import {
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaFacebook,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";

const SocialMediaPopout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIcons = () => setIsOpen(!isOpen);

  const leftIcons = [
    { icon: <FaInstagram />, link: "https://instagram.com" },
    { icon: <FaWhatsapp />, link: "https://wa.me/your_number" },
    { icon: <FaPhone />, link: "tel:+1234567890" },
    { icon: <FaFacebook />, link: "https://facebook.com" },
    { icon: <FaYoutube />, link: "https://youtube.com" },
    { icon: <FaEnvelope />, link: "mailto:your@email.com" },
  ];

  return (
    <>
      {/* Background blur when open */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"></div>
      )}

      <div className="fixed bottom-[85px] right-4 sm:bottom-6 sm:right-6 z-50">
        <div className="relative flex items-center sm:gap-3 gap-1">

          {/* Handwritten Text and Arrow above button */}
          <div className="absolute bottom-[50px] right-[-20px] flex flex-col items-center z-70">
            <p
              className="text-black text-base sm:text-xl animate-bounce leading-none"
              style={{ fontFamily: "'Zeyada', cursive" }}
            >
              Come follow us
            </p>
            <span className="text-black text-2xl sm:text-3xl">↓</span>
          </div>

          {/* Social Icons */}
          <div className="flex sm:gap-3 gap-1">
            {leftIcons.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white bg-opacity-20 text-white backdrop-blur-md shadow-xl border border-white/30 flex items-center justify-center transition-all duration-500 ease-out ${
                  isOpen
                    ? "opacity-100 -translate-x-0"
                    : "opacity-0 translate-x-4 pointer-events-none"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {item.icon}
              </a>
            ))}
          </div>

          {/* Toggle Button */}
          <button
            onClick={toggleIcons}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black text-white text-xl flex items-center justify-center shadow-lg hover:scale-105 transition-all z-50"
          >
            {isOpen ? "✕" : "🤝"}
          </button>
        </div>
      </div>

      {/* Google Font Import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Zeyada&display=swap"
        rel="stylesheet"
      />
    </>
  );
};

export default SocialMediaPopout;
