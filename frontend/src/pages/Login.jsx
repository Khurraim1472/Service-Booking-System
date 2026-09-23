import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";


export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showpassword, setShowpassword] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            const response = await axios.post(
                "https://service-booking-system-k132.onrender.com/api/auth/login",
                formData
            )
            setSuccess(response.data.message);
        }
        catch (error) {
                      setError(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="min-h-screen bg-[#07090E] text-[#F4F5F7] flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans antialiased">

            {/* Main Container Mockup Card - Stacks on mobile, side-by-side on md+ screens */}
            <div className="flex flex-col md:flex-row w-full max-w-[900px] bg-[#131B2E] rounded-[20px] overflow-hidden border border-white/[0.08] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]">

                {/* Left Brand / Visual Panel */}
                <div className="flex-1 bg-[#0E131F] p-6 sm:p-8 md:p-12 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-white/[0.08]">

                    {/* Ambient background glow */}
                    <div className="absolute -top-[50px] -left-[50px] w-[200px] h-[200px] bg-[#E8A33D]/[0.07] blur-[60px] rounded-full pointer-events-none" />

                    {/* Brand Header */}
                    <div className="flex items-center gap-3 z-10">
                        <div className="w-[42px] h-[42px] rounded-[10px] bg-gradient-to-br from-[#E8A33D] to-[#C68222] flex items-center justify-center shadow-[0_4px_12px_rgba(232,163,61,0.3)] shrink-0">
                            {/* Custom SM Monogram Icon */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0E131F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 15c0-2 2-3 4-3s4 1 4 3-2 3-4 3-4-1-4-3z" />
                                <path d="M12 9c0-2 2-3 4-3s4 1 4 3-2 3-4 3-4-1-4-3z" />
                            </svg>
                        </div>
                        <span className="text-[#FFFFFF] text-[18px] sm:text-[19px] font-semibold tracking-tight">Service Made Easy</span>
                    </div>

                    {/* Center Graphic & Tagline */}
                    <div className="flex flex-col items-center justify-center my-8 md:my-6 z-10">
                        <svg className="w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] md:w-[190px] md:h-[190px]" viewBox="0 0 220 220" aria-hidden="true">
                            <g fill="none" stroke="#E8A33D" strokeWidth="5" strokeLinejoin="round" opacity="0.9">
                                <path d="M40 60 L110 20 L180 60 L180 130 L110 170 L40 130 Z" />
                            </g>
                            <g fill="none" stroke="#94A3B8" strokeWidth="5" strokeLinejoin="round" opacity="0.6">
                                <path d="M70 75 L110 52 L150 75 L150 118 L110 140 L70 118 Z" />
                            </g>
                            <g fill="none" stroke="#4FA7A0" strokeWidth="5" strokeLinejoin="round">
                                <path d="M95 95 L110 87 L125 95 L125 112 L110 120 L95 112 Z" />
                            </g>
                        </svg>
                        <p className="text-[#94A3B8] text-[13px] sm:text-[14px] text-center leading-relaxed max-w-[240px] mt-4 sm:mt-6">
                            Home, vehicle, and tech help, booked in minutes.
                        </p>
                    </div>

                    {/* Balanced empty footer block matching layout structure */}
                    <div className="hidden md:block invisible h-6"></div>
                </div>

                {/* Right Form Panel */}
                <div className="flex-[1.2] p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                    <h1 className="text-[20px] sm:text-[22px] font-semibold text-white tracking-tight mb-1.5">Sign in to your account</h1>
                    <p className="text-[13px] sm:text-[14px] text-[#94A3B8] mb-6 sm:mb-8">Welcome back! Access your services.</p>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        <div>
                            <label className="block text-[13px] font-medium text-[#94A3B8] mb-1.5">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your Email"
                                required
                                className="w-full bg-[#0B0F17] border border-white/[0.08] rounded-xl py-3 px-4 text-white text-[14px] placeholder-[#64748B] focus:outline-none focus:border-[#E8A33D] focus:ring-2 focus:ring-[#E8A33D]/15 transition-all"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-[13px] font-medium text-[#94A3B8]">Password</label>

                            </div>
                            <div className='relative'>
                                <input
                                    type={showpassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                    required
                                    className="w-full bg-[#0B0F17] border border-white/[0.08] rounded-xl py-3 px-4 text-white text-[14px] placeholder-[#64748B] focus:outline-none focus:border-[#E8A33D] focus:ring-2 focus:ring-[#E8A33D]/15 transition-all"
                                />
                                <button
                                    disabled={!formData.password}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    type="button"
                                    onClick={() => setShowpassword(!showpassword)}
                                >
                                    {showpassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <div className="text-right mt-1.5">
                                <a
                                    href="#forgot"
                                    className="text-[12px] text-[#E8A33D] hover:underline"
                                >
                                    Forgot password?
                                </a>
                            </div>

                        </div>
                        {error && (
                            <p className="text-red-400 text-sm text-center mb-3">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-[#E8A33D] hover:bg-[#D59230] text-[#0E131F] font-semibold py-3 sm:py-3.5 rounded-xl text-[14px] transition-all duration-200 shadow-[0_4px_14px_rgba(232,163,61,0.25)] active:scale-[0.99] mt-2 cursor-pointer"
                        >
                            Sign in
                        </button>
                    </form>
                    {error && (
                        <p className="text-red-400 text-sm text-center mt-3">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="text-green-400 text-sm text-center mt-3">
                            {success}
                        </p>
                    )}


                    <div className="text-center text-[13px] text-[#64748B] mt-5 sm:mt-6">
                        Don't have an account? <Link to="/" className="text-[#E8A33D] font-medium hover:underline">Register</Link>
                    </div>
                </div>

            </div>
        </div>
    );
}