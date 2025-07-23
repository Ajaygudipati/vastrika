import React, { useEffect, useState } from "react";
import "../styles/NeedleFollow.css";
import needleImg from "../needle.png"; // Make sure this is in `src/needle.png`
import "../styles/FloatingTailorIconsLogin.css";
import { useNavigate } from "react-router-dom"; // ✅ imported for navigation
import { Slab } from "react-loading-indicators"; // ✅ Importing Slab loader
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // ✅ added Google login imports

const LoginHeader = () => {
  return (
    <div className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 fixed top-0 z-40">
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-wide font-montserrat">
          VASTRIKA
        </h1>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [needlePosition, setNeedlePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);

  
  const navigate = useNavigate(); // ✅ useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
     setErrorMsg("");
     setSuccessMsg("");
     setLoginLoading(true);

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      setSuccessMsg('');
      setLoginLoading(false);
      return;
    }
    

    try {
      const response = await fetch("https://vastrika-backend-u8kd.onrender.com/api/auth/login", {
        
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      data = { message: "Invalid server response." };
    }

    if (response.ok) {
      setSuccessMsg("Login successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      setTimeout(() => {
        setLoginLoading(false);
        navigate("/homepage");
      }, 1000);
    } else {
      setErrorMsg(data.message || "Login failed.");
       setSuccessMsg("");
      setLoginLoading(false); // ✅ stop loading if error
    }
  } catch (error) {
    console.error("Login error:", error);
    setErrorMsg("Something went wrong. Please try again.");
    setLoginLoading(false); // ✅ stop loading if error
  }
};

// ✅ Google login logic
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const name = user.displayName;
      const email = user.email;
      const photo = user.photoURL;

    // ✅ Save to localStorage or context (your choice)
   localStorage.setItem("vastrikaUser", JSON.stringify({
  name: result.user.displayName,
  email: result.user.email,
  photo: result.user.photoURL,
  isGoogleUser: true,
}));
      // Optional: send user.email to your backend to check registration
      // For now, just store and redirect
      localStorage.setItem("user", JSON.stringify(user));
      setSuccessMsg("Google login successful!");
      setTimeout(() => {
        navigate("/homepage");
      }, 1000);
    } catch (error) {
      console.error("Google login error:", error);
      setErrorMsg("Google login failed. Try again.");
    }
  };
  

  useEffect(() => {
    const handleMouseMove = (e) => {
      setNeedlePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Slab size={50} color="#4A5568" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex font-montserrat">
      {/* 🧵 Header */}
      <LoginHeader />

      {/* Needle that follows mouse */}
      <img
        src={needleImg}
        alt="Needle Follower"
        className="needle-follow"
        style={{
          transform: `translate(${needlePosition.x}px, ${needlePosition.y}px)`,
        }}
      />

      {/* Left Form Section */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-10 md:px-20 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome Back ✂️</h2>
        <p className="text-gray-600 mb-8">Login to continue stitching with Vastrika</p>

        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-xl text-sm">{errorMsg}</div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          <div className="relative w-full mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
            >
              {showPassword ? (
                // Eye Open (Password Visible)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                // Eye Closed (Password Hidden)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5A11.94 11.94 0 015.632 5.087M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.032-1.263A11.94 11.94 0 0018.368 5.08M19.385 19.385L4.615 4.615" />
                </svg>
              )}
            </button>
          </div>
          <button
  type="submit"
  onClick={handleSubmit}
  disabled={loginLoading}
  className={`w-full px-4 py-2 rounded-lg text-white font-semibold ${
    loginLoading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-900"
  }`}
>
  {loginLoading ? "Logging in..." : "Login"}
</button>

        </form>
        {loginLoading && (
          <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
            <Slab color="#000" size="medium" text="Logging in..." textColor="#000" />
          </div>
        )}


        {successMsg && (
          <div className="bg-green-100 text-green-700 p-3 mt-4 rounded-xl text-sm">
            {successMsg}
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-gray-400 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={handleGoogleLogin} // ✅ Google login handler
            className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition-all"
          >
            <img
              src="https://img.icons8.com/ios-filled/24/google-logo.png"
              alt="Google"
              className="mr-3"
            />
            Continue with Google
          </button>

          <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition-all">
            <img src="https://img.icons8.com/ios-filled/24/mac-os.png" alt="Apple" className="mr-3" />
            Continue with Apple
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-10 text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-gray-800 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </div>

      {/* Right Animation Section with Floating Icons */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-slate-100 via-white to-slate-200 items-center justify-center relative overflow-hidden">

        {/* Floating Icons with animations */}
        <img src="/Assets/needle.png" className="floating-icon orbit-fast w-[60px]" style={{ top: "10%", left: "10%" }} alt="Needle" />
        <img src="/Assets/scissors.png" className="floating-icon orbit-slow w-[70px]" style={{ top: "10%", left: "80%" }} alt="Scissors" />
        <img src="/Assets/threads.png" className="floating-icon orbit-pulse w-[65px]" style={{ top: "50%", left: "10%" }} alt="Threads" />
        <img src="/Assets/tape.png" className="floating-icon orbit-fast w-[70px]" style={{ top: "90%", left: "80%" }} alt="Tape" />
        <img src="/Assets/sewing.png" className="floating-icon orbit-pulse w-[75px]" style={{ top: "10%", left: "45%" }} alt="Sewing Machine" />
        <img src="/Assets/button.png" className="floating-icon orbit-slow w-[70px]" style={{ top: "90%", left: "8%" }} alt="Button" />
        <img src="/Assets/dress.png" className="floating-icon orbit-fast w-[70px]" style={{ top: "50%", left: "80%" }} alt="Dress" />
        <img src="/Assets/bobbin.png" className="floating-icon orbit-pulse w-[70px]" style={{ top: "90%", left: "45%" }} alt="Bobbin" />

        {/* Centered Vastrika Text */}
        <div className="vastrika-brand-text font-montserrat z-10">
          <span className="shimmer-text">Vastrika</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
