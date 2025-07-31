import needleImg from "../needle.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Slab } from "react-loading-indicators";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useMemo } from "react";
import SocialMediaPopup from "../components/SocialMediaPopup";
import BrandScroller from "../components/BrandScroller";



// Background image import
import backgroundImage from "./background.jpg"; // Make sure this file exists
import { Scroll } from "lucide-react";

const SignupHeader = () => {
  return (
    <div className="w-full px-6 py-4 bg-white shadow-sm border-b border-gray-200 fixed top-0 z-40">
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold text-black tracking-wide font-montserrat">
          VASTRIKA
        </h1>
      </div>
    </div>
  );
};

const backgroundWords = [
  "stitch", "thread", "fabric", "seam", "needle", "button", "hem", "cut", "fold", "lace",
  "zip", "pico", "style", "custom", "measure", "design", "tailor", "blouse", "dress",
  "frock", "skirt", "pants", "tops", "choli", "pleat", "overlock", "embroidery", "silk",
  "cotton", "flair", "fit", "pattern", "trim", "ironing", "alter", "border", "frill",
  "tailoring", "needlework", "fabrication", "fitting", "drape", "bobbin", "loop", "hook",
  "sew", "textile", "lining", "material", "fit", "craft"
];

const SignupPage = () => {
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");
    setSignupLoading(true);

    try {
      const res = await fetch("https://vastrika-backend-u8kd.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      alert("Server error. Please try again.");
    } finally {
      setSignupLoading(false);
    }
  };
  // Outside your component (so it doesn't re-generate on every render)
const scribbleWords = useMemo(() => {
  return Array.from({ length: 50 }).map((_, i) => ({
    word: backgroundWords[i % backgroundWords.length],
    top: Math.random() * 95,
    left: Math.random() * 90,
    fontSize: 22 + Math.random() * 16,
    rotate: Math.random() * 60 - 30,
    opacity: 0.9 - Math.random() * 0.4,
    blur: Math.random() < 0.3 ? 1 : 0,
    zIndex: Math.random() < 0.5 ? -1 : 0,
  }));
}, []);

return (
  <div
    className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-start pt-24 px-4"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    {/* Overlay */}
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundColor: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(2px)",
      }}
    ></div>

    {/* Scribble Words */}
    <div className="absolute inset-0 z-0">
      {scribbleWords.map((pos, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: `${pos.top}%`,
            left: `${pos.left}%`,
            fontSize: `${pos.fontSize}px`,
            transform: `rotate(${pos.rotate}deg)`,
            color: "black",
            opacity: pos.opacity,
            filter: pos.blur ? "blur(1px)" : "none",
            zIndex: pos.zIndex,
            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
          className="font-zeyada"
        >
          {pos.word}
        </span>
      ))}
    </div>

    {/* Optional Header */}
    <SignupHeader />

    {/* Signup Form */}
    <div className="relative z-10 max-w-md w-full bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-5 text-black mb-10">
      <h2 className="text-3xl font-bold text-black mb-4 text-center">Create Account</h2>
      <p className="text-sm text-black/80 text-center mb-6">Join Vastrika and stitch your style today.</p>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded-xl mb-6 text-center animate-bounce">
          Signup Successful! Redirecting to login...
        </div>
      )}

      {!success && (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 bg-white/50 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 bg-white/50 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 bg-white/50 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 bg-white/50 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div
              className="absolute right-4 top-3 cursor-pointer text-gray-700"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 bg-white/50 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div
              className="absolute right-4 top-3 cursor-pointer text-gray-700"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-900 transition-all flex items-center justify-center"
            disabled={signupLoading}
          >
            {signupLoading ? (
              <div className="flex items-center gap-2">
                <Slab size={20} color="#fff" />
                <span>Signing up...</span>
              </div>
            ) : (
              "Signup"
            )}
          </button>
        </form>
      )}

      <p className="text-sm text-black text-center mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-black font-semibold hover:underline">
          Login
        </a>
      </p>
    </div>
    {/* Footer */}
    <footer className="relative z-10 text-center text-sm text-gray-600 mt-[-80] mb-0">
      © 2025 <span className="font-semibold">Vastrika</span>. All rights reserved. Made with <span className="text-red-500">❤️</span>
      <br />
      <span className="font-bold"> An Aiónios Product... </span>
    </footer>

    {/* Social Media Popup */}
    <SocialMediaPopup />
  </div>
);
};

export default SignupPage;
