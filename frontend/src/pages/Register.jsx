import  { useState } from 'react';
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState("")
  const [success, setSuccess] = useState("")
  const [showpassword, setShowpassword] = useState(false)
  const [showConfirmpassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      setErrors("");
      setSuccess("");

      const response = await axios.post(
        "https://service-booking-system-k132.onrender.com/api/auth/register",
        formData
      );
      if (response.data.success) {
        setSuccess(response.data.message);
      }


    } catch (error) {
console.log(error.response?.data);
       setErrors({
        [error.response.data.field]: error.response.data.message
    });
    }
  };

  return (
    <div style={{
      backgroundColor: '#07090E',
      color: '#F4F5F7',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      fontFamily: "'Inter', sans-serif"
    }}>

      {/* Responsive Mockup Card Container */}
      <div className="auth-card-wrapper" style={{
        display: 'flex',
        width: '100%',
        maxWidth: '900px',
        backgroundColor: '#131B2E',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
      }}>

        {/* Left Brand / Visual Panel */}
        <div className="auth-brand-panel" style={{
          flex: '0.9',
          backgroundColor: '#0E131F',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)'
        }}>

          {/* Ambient Glow */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            left: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(232, 163, 61, 0.07)',
            filter: 'blur(60px)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }} />

          {/* Logo Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 2 }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #E8A33D, #C68222)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(232, 163, 61, 0.3)',
              flexShrink: 0
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0E131F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 15c0-2 2-3 4-3s4 1 4 3-2 3-4 3-4-1-4-3z" />
                <path d="M12 9c0-2 2-3 4-3s4 1 4 3-2 3-4 3-4-1-4-3z" />
              </svg>
            </div>
            <span style={{ color: '#FFFFFF', fontSize: '19px', fontWeight: 600, letterSpacing: '-0.01em' }}>Service Made Easy</span>
          </div>

          {/* Center SVG Graphic & Tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '32px 0', zIndex: 2 }}>
            <svg className="brand-svg" width="170" height="170" viewBox="0 0 220 220" aria-hidden="true" style={{ maxWidth: '100%', height: 'auto' }}>
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
            <p style={{ color: '#94A3B8', fontSize: '14px', textAlign: 'center', lineHeight: '1.5', maxWidth: '240px', marginTop: '20px' }}>
              Home, vehicle, and tech help, booked instantly by trusted local pros.
            </p>
          </div>

          {/* Trust Footer Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', zIndex: 2 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              color: '#94A3B8',
              textAlign: 'center'
            }}>
              <span style={{ color: '#E8A33D', fontWeight: 'bold' }}>✓</span> Verified Service Professionals
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="auth-form-panel" style={{
          flex: '1.2',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h1 style={{ fontWeight: 600, fontSize: '22px', color: '#FFFFFF', margin: '0 0 6px', letterSpacing: '-0.02em' }}>Create your account</h1>
          <p style={{ fontSize: '14px', color: '#94A3B8', margin: '0 0 20px' }}>Get started with your service bookings today.</p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '13px', fontWeight: 500, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Full name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Full Name"

                style={{ width: '100%', background: '#0B0F17', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '11px 14px', color: '#FFFFFF', fontSize: '14px', outline: 'none' }}
              />
              {errors.name && (
    <p className="text-red-500 text-sm mt-1">
        {errors.name}
    </p>
)}
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '13px', fontWeight: 500, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                
                style={{ width: '100%', background: '#0B0F17', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '11px 14px', color: '#FFFFFF', fontSize: '14px', outline: 'none' }}
              />
              {errors.email && (
    <p className="text-red-500 text-sm mt-1">
        {errors.email}
    </p>
)}
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '13px', fontWeight: 500, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Phone number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="03XX XXXXXXX"
                
                style={{ width: '100%', background: '#0B0F17', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '11px 14px', color: '#FFFFFF', fontSize: '14px', outline: 'none' }}
              />
              {errors.phone && (
    <p className="text-red-500 text-sm mt-1">
        {errors.phone}
    </p>
)}
            </div>

            <div className="input-row" style={{ display: 'flex', gap: '12px', marginBottom: '18px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>Password</label>
                <div className="relative">

                  <input className="pr-10 ..."
                    type={showpassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                   
                    style={{ width: '100%', background: '#0B0F17', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '11px 14px', color: '#FFFFFF', fontSize: '14px', outline: 'none' }}
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
                {errors.password && (
    <p className="text-red-500 text-sm mt-1">
        {errors.password}
    </p>
)}
    
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '13px', fontWeight: 500, color: '#94A3B8', display: 'block', marginBottom: '6px' }}> Confirm Password</label>
                <div className='relative'>

                  <input
                    type={showConfirmpassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter Confirm Password"
                    
                    style={{ width: '100%', background: '#0B0F17', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '11px 14px', color: '#FFFFFF', fontSize: '14px', outline: 'none' }}
                  />
 
                  <button
                    disabled={!formData.password}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmpassword)}
                  >
                    {showConfirmpassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                                 {errors.confirmPassword && (
    <p className="text-red-500 text-sm mt-1">
        {errors.confirmPassword}
    </p>
)}
              </div>
            </div>


          
            <button type="submit" style={{
              width: '100%',
              background: '#E8A33D',
              color: '#0E131F',
              border: 'none',
              borderRadius: '10px',
              padding: '12px 0',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(232, 163, 61, 0.25)'
            }}>
              Register
            </button>
             

          </form>
             {success && (
              <p className="text-green-500 text-sm">
                {success}
              </p>
            )}
          <p style={{ textAlign: 'center', fontSize: '13px', color: '#64748B', margin: '18px 0 0' }}>
            Already have an account? <span style={{ color: '#E8A33D', fontWeight: 500, cursor: 'pointer' }}><Link to="/login">Login</Link></span>
          </p>
        </div>

      </div>

      {/* Embedded CSS Media Query for Mobile Responsiveness */}
      <style>{`
        @media (max-width: 768px) {
          .auth-card-wrapper {
            flex-direction: column !important;
            max-width: 440px !important;
          }
          .auth-brand-panel {
            padding: 28px 20px !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
          .auth-form-panel {
            padding: 28px 20px !important;
          }
        }
        @media (max-width: 480px) {
          .input-row {
            flex-direction: column !important;
            gap: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}