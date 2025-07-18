import needleImg from "../needle.png";
import React, { useEffect, useState } from "react";
import "../styles/NeedleFollow.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FiEye, FiEyeOff } from "react-icons/fi";

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

const SignupPage = () => {
  const [needlePosition, setNeedlePosition] = useState({ x: 0, y: 0 });
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);




  useEffect(() => {
    const handleMouseMove = (e) => {
      setNeedlePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if passwords match
  if (password !== confirmPassword) {
    setPasswordError("Passwords do not match");
    return;
  }

  setPasswordError("");

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("✅ Signup success:", data);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } else {
      console.error("❌ Signup failed:", data.message);
      alert(data.message || "Signup failed");
    }
  } catch (error) {
    console.error("🔥 Server error:", error);
    alert("Server error. Please try again.");
  }
  console.log("📤 Sending to backend:", { name, email, phone, password });
};



  return (
    <div className="min-h-screen flex font-montserrat relative overflow-hidden">
      {/* 🧵 Needle Follower */}
      <img
        src={needleImg}
        alt="Needle"
        className="needle-follow"
        style={{
          position: "fixed",
          top: needlePosition.y,
          left: needlePosition.x,
          width: "40px",
          height: "auto",
          pointerEvents: "none",
          zIndex: 50,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* 🧢 Header */}
      <SignupHeader />

      {/* 🧷 Right Side Icons */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-slate-100 via-white to-slate-200 items-center justify-center relative overflow-hidden">
        <img src="/Assets/needle.png" className="floating-icon w-[60px]" style={{ top: "15%", left: "10%" }} alt="Needle" />
        <img src="/Assets/scissors.png" className="floating-icon w-[70px]" style={{ top: "15%", left: "80%" }} alt="Scissors" />
        <img src="/Assets/threads.png" className="floating-icon w-[65px]" style={{ top: "50%", left: "10%" }} alt="Threads" />
        <img src="/Assets/button.png" className="floating-icon w-[80px]" style={{ top: "80%", left: "45%" }} alt="Button" />
        <img src="/Assets/sewing.png" className="floating-icon w-[75px]" style={{ top: "48%", left: "80%" }} alt="Sewing" />
        <h1 style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "4rem", fontWeight: "bold", color: "#000000" }}>✂ Vastrika </h1>
      </div>

      {/* 📝 Signup Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-10 md:px-20 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Create Your Account 🧵</h2>
        <p className="text-gray-600 mb-8">Join Vastrika and stitch your style today.</p>

        {/* ✅ Signup Success Animation */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded-xl mb-6 text-center animate-bounce">
            Signup Successful! Redirecting to login...
          </div>
        )}

        {/* 🚫 Don't show form if success */}
        {!success && (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full name */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            {/* Email  */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            {/* Phone Number */}
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />

            {/* Password */}
           <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              <div
                className="absolute right-4 top-4 cursor-pointer text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {/* 👇 Show FiEye when password is hidden, FiEyeOff when visible */}
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              <div
                className="absolute right-4 top-4 cursor-pointer text-gray-600"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {/* 👇 Correctly toggle icon */}
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>

            {/* Password mismatch error */}
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gray-800 text-white font-semibold py-3 rounded-xl hover:bg-gray-900 transition-all"
            >
              Sign Up
            </button>
          </form>
        )}

        {/* Divider */}
        {!success && (
          <>
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-4 text-gray-400 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* OAuth Options */}
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition-all">
                <img src="https://img.icons8.com/ios-filled/24/google-logo.png" alt="Google" className="mr-3" />
                Continue with Google
              </button>
              <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition-all">
                <img src="https://img.icons8.com/ios-filled/24/mac-os.png" alt="Apple" className="mr-3" />
                Continue with Apple
              </button>
            </div>

            {/* Footer */}
            <p className="text-sm text-gray-500 mt-10 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-gray-800 font-semibold hover:underline">
                Login
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
