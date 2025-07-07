import React, { useEffect, useState } from "react";
import "../styles/NeedleFollow.css";
import needleImg from "../needle.png"; // Make sure this is in `src/needle.png`
import "../styles/FloatingTailorIconsLogin.css";

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
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [needlePosition, setNeedlePosition] = useState({ x: 0, y: 0 });


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      setSuccessMsg('');
      return;
    }

    setSuccessMsg(`Logged in as: ${email}`);
    setErrorMsg('');
  };

useEffect(() => {
    const handleMouseMove = (e) => {
      setNeedlePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          <button
            type="submit"
            className="w-full bg-gray-800 text-white font-semibold py-3 rounded-xl hover:bg-gray-900 transition-all"
          >
            Login
          </button>
        </form>
                {/* {errorMsg && (
          <div className="bg-red-100 text-red-700 p-3 mt-4 rounded-xl text-sm">
            {errorMsg}
          </div>
        )} */}

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
  onClick={() => window.location.href = "https://mail.google.com"}
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
