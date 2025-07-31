import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slab } from "react-loading-indicators";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import SocialMediaPopup from "../components/SocialMediaPopup";
import { useMemo } from "react";


const LoginHeader = () => (
  <div className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 fixed top-0 z-40">
    <div className="flex items-center justify-center">
      <h1 className="text-2xl font-bold text-gray-800 tracking-wide font-montserrat">VASTRIKA</h1>
    </div>
  </div>
);
const backgroundWordsList = [
  "Stitch", "Thread", "Fabric", "Needle", "Blouse", "Saree", "Skirt", "Pico", "Fall",
  "Cutting", "Tailor", "Design", "Embroidery", "Fitting", "Pattern", "Hook", "Hem",
  "Silk", "Cotton", "Alter", "Zip", "Custom", "Style", "Fold", "Measure", "Marking",
  "Frill", "Tuck", "Border", "Pleat", "Kurti", "Choli", "Mirror", "Lace", "Beads",
  "Canvas", "Seam", "Align", "Overlock", "Gusset", "Tassel", "Lining", "Bias", "Chalk",
  "Scissors", "Brocade", "Trial", "Trim", "Edge", "Panel", "Yoke", "Threading",
  "Loops", "Gather", "Tape", "Press"
];

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [backgroundWords, setBackgroundWords] = useState([]);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoginLoading(true);

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      setLoginLoading(false);
      return;
    }

    try {
      const response = await fetch("https://vastrika-backend-u8kd.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg("Login successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("vastrikaUser", JSON.stringify({
          name: data.user.name,
          email: data.user.email,
          photo: data.user.photo || "",
          isGoogleUser: false,
        }));

        setTimeout(() => {
          setLoginLoading(false);
          navigate("/homepage");
        }, 1000);
      } else {
        setErrorMsg(data.message || "Login failed.");
        setLoginLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Something went wrong. Please try again.");
      setLoginLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem("vastrikaUser", JSON.stringify({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        isGoogleUser: true,
      }));

      setSuccessMsg("Google login successful!");
      setTimeout(() => navigate("/homepage"), 1000);
    } catch (error) {
      console.error("Google login error:", error);
      setErrorMsg("Google login failed. Try again.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);

    const generatedWords = Array.from({ length: 60 }).map((_, i) => {
      const word = backgroundWordsList[i % backgroundWordsList.length];
      const top = Math.random() * 95;
      const left = Math.random() * 90;
      const fontSize = 22 + Math.random() * 16;
      const rotate = Math.random() < 0.5 ? 0 : Math.random() * 60 - 30;

      return { word, top, left, fontSize, rotate };
    });

    setBackgroundWords(generatedWords);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Slab size={50} color="#4A5568" />
      </div>
    );
  }


  return (

    
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#f6f6f9] via-[#fefefe] to-[#f6f6f9]">
     {/* Desktop View - Sticky Left Timeline with Blur */}
<div className="hidden lg:fixed lg:top-[30%] lg:left-4 lg:z-50 lg:flex lg:flex-col items-start space-y-3 font-zeyada text-black text-[18px] pointer-events-none select-none">

  <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 shadow-lg space-y-3">
    <div className="flex flex-col items-start">
      <h2 className="text-2xl font-bold underline decoration-2 underline-offset-4 mb-4 text-gray-800">
        How we work...
      </h2>
      <span className="whitespace-normal max-w-[200px] leading-snug">Book a Stitch</span>
      <span className="text-xl ml-2">↓</span>
    </div>
    <div className="flex flex-col items-start">
      <span className="whitespace-normal max-w-[200px] leading-snug">We collect fabric, measurements & preferences</span>
      <span className="text-xl ml-2">↓</span>
    </div>
    <div className="flex flex-col items-start">
      <span className="whitespace-normal max-w-[200px] leading-snug">Our expert tailors craft your perfect fit</span>
      <span className="text-xl ml-2">↓</span>
    </div>
    <div className="flex flex-col items-start">
      <span className="whitespace-normal max-w-[200px] leading-snug">We deliver your elegance to your doorstep</span>
    </div>
  </div>

</div>

         {/* Scribble Words */}
<div className="absolute inset-0 z-0">
  {backgroundWords.map((pos, i) => (
    <span
      key={i}
      style={{
        position: "absolute",
        top: `${pos.top}%`,
        left: `${pos.left}%`,
        fontSize: `${pos.fontSize}px`,
        transform: `rotate(${pos.rotate}deg)`,
        color: "black",
        opacity: 1,
        filter: pos.blur ? "blur(1px)" : "none",
        zIndex: pos.zIndex ?? 0,
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

      {/* Header */}
      <LoginHeader />

      {/* Form container */}
      <div className="relative z-20 w-full max-w-md bg-white/30 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-10 text-black mt-20 mx-4">
        <h2 className="text-3xl font-bold text-black mb-4 text-center">Welcome Back ✂️</h2>
        <p className="text-sm text-black/80 text-center mb-6">Login to continue stitching with Vastrika</p>

        {errorMsg && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-xl text-sm">{errorMsg}</div>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div
              className="absolute right-4 top-3 cursor-pointer text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7C20.268 16.057 16.478 19 12 19c-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9.27-3.11-11-7.5A11.94 11.94 0 015.632 5.087M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.032-1.263A11.94 11.94 0 0018.368 5.08M19.385 19.385L4.615 4.615" />
                </svg>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-900 transition-all ${loginLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            disabled={loginLoading}
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center justify-center gap-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition-all"
          >
            <img src="https://img.icons8.com/ios-filled/24/google-logo.png" alt="Google" className="mr-3" />
            Continue with Google
          </button>
        </div>

        {successMsg && (
          <div className="bg-green-100 text-green-700 p-3 mt-4 rounded-xl text-sm text-center">
            {successMsg}
          </div>
        )}

        <p className="text-sm text-black text-center mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-black font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-6 mb-4 z-20">
        © {new Date().getFullYear()} Vastrika · All rights reserved · Made with ❤️
      </footer>

      <SocialMediaPopup />
    </div>
  );
};

export default LoginPage;
