import React from 'react';

const Logo = ({ size = "medium", className = "" }) => {
  const getSize = () => {
    switch (size) {
      case "small": return { width: 32, height: 32 };
      case "large": return { width: 64, height: 64 };
      default: return { width: 48, height: 48 };
    }
  };

  const dimensions = getSize();

  return (
    <div className={`logo-container ${className}`}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#gradient1)"
          stroke="#2c3e50"
          strokeWidth="2"
        />
        
        {/* Inner Circle */}
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          opacity="0.8"
        />
        
        {/* Employee Icon - Person */}
        <path
          d="M50 25C45.5817 25 42 28.5817 42 33C42 37.4183 45.5817 41 50 41C54.4183 41 58 37.4183 58 33C58 28.5817 54.4183 25 50 25Z"
          fill="#ffffff"
        />
        
        {/* Body */}
        <path
          d="M35 65C35 55 42 50 50 50C58 50 65 55 65 65V75H35V65Z"
          fill="#ffffff"
        />
        
        {/* Management Lines */}
        <line
          x1="20"
          y1="20"
          x2="30"
          y2="30"
          stroke="#3498db"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="80"
          y1="20"
          x2="70"
          y2="30"
          stroke="#3498db"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="80"
          x2="30"
          y2="70"
          stroke="#3498db"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="80"
          y1="80"
          x2="70"
          y2="70"
          stroke="#3498db"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3498db" />
            <stop offset="100%" stopColor="#2c3e50" />
          </linearGradient>
        </defs>
      </svg>
  <span className="logo-text">StaffSphere</span>
    </div>
  );
};

export default Logo;
