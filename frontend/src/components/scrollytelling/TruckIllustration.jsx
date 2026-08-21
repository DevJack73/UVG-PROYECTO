import React from 'react';
import { motion } from 'framer-motion';

/**
 * Illustrated UVG Altiplano Delivery Truck
 * Connects the narrative journey across all stops
 */
export default function TruckIllustration({ isMoving = false, cargoOpen = false }) {
  return (
    <div className="relative w-64 h-36 sm:w-80 sm:h-44 md:w-96 md:h-52 select-none">
      <svg
        viewBox="0 0 380 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        {/* Ground shadow */}
        <ellipse cx="190" cy="188" rx="170" ry="10" fill="rgba(15, 23, 42, 0.18)" />

        {/* Headlight beam (when moving) */}
        {isMoving && (
          <polygon
            points="340,135 480,110 480,185 340,155"
            fill="url(#headlightBeam)"
            opacity="0.4"
          />
        )}

        <defs>
          <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="truckBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1b4332" />
            <stop offset="100%" stopColor="#0d281e" />
          </linearGradient>
          <linearGradient id="cabGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2d6a4f" />
            <stop offset="100%" stopColor="#1b4332" />
          </linearGradient>
        </defs>

        {/* Main Cargo Container (Forest Green) */}
        <rect
          x="30"
          y="40"
          width="210"
          height="115"
          rx="6"
          fill="url(#truckBodyGrad)"
          stroke="#0f172a"
          strokeWidth="2"
        />

        {/* Decorative UVG Stripes */}
        <rect x="30" y="96" width="210" height="8" fill="#d97706" />
        <rect x="30" y="106" width="210" height="3" fill="#fef3c7" opacity="0.6" />

        {/* Branding on Container */}
        <g transform="translate(45, 68)">
          <text
            x="0"
            y="0"
            fill="#ffffff"
            fontSize="13"
            fontWeight="800"
            fontFamily="Outfit, sans-serif"
            letterSpacing="0.5"
          >
            UVG ALTIPLANO
          </text>
          <text
            x="0"
            y="14"
            fill="#fcd34d"
            fontSize="9"
            fontWeight="600"
            fontFamily="sans-serif"
            letterSpacing="0.2"
          >
            SOLIDARIDAD EN RUTA
          </text>
        </g>

        {/* Cargo Door (Back Left) */}
        <g transform="translate(30, 40)">
          {cargoOpen ? (
            // Open door revealing packed aid boxes
            <g>
              <rect x="2" y="2" width="45" height="111" fill="#14532d" />
              {/* Stacked Aid Packages inside */}
              <rect x="6" y="70" width="18" height="18" fill="#d97706" rx="2" />
              <rect x="26" y="70" width="18" height="18" fill="#b45309" rx="2" />
              <rect x="14" y="50" width="18" height="18" fill="#f59e0b" rx="2" />
              <rect x="8" y="28" width="16" height="20" fill="#3b82f6" rx="2" />
              {/* Open door flap */}
              <polygon points="0,0 -20,10 -20,120 0,115" fill="#0f172a" opacity="0.8" />
            </g>
          ) : (
            // Closed secure door with handles
            <g>
              <rect x="0" y="0" width="30" height="115" fill="#14532d" opacity="0.4" />
              <line x1="15" y1="5" x2="15" y2="110" stroke="#0f172a" strokeWidth="2" />
              <rect x="13" y="60" width="4" height="15" rx="1" fill="#cbd5e1" />
            </g>
          )}
        </g>

        {/* Truck Cabin (Front Right) */}
        <path
          d="M240 70 L285 70 L320 105 L340 108 L340 155 L240 155 Z"
          fill="url(#cabGrad)"
          stroke="#0f172a"
          strokeWidth="2"
        />

        {/* Windshield */}
        <path
          d="M282 75 L315 106 L282 106 Z"
          fill="#93c5fd"
          stroke="#1e293b"
          strokeWidth="1.5"
        />
        <path d="M290 80 L310 102" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

        {/* Side Door & Handle */}
        <rect x="250" y="85" width="32" height="60" rx="2" fill="none" stroke="#0f172a" strokeWidth="1.5" />
        <rect x="254" y="112" width="6" height="2.5" rx="1" fill="#cbd5e1" />

        {/* Front Bumper & Grill */}
        <rect x="335" y="130" width="15" height="22" rx="3" fill="#334155" />
        <line x1="338" y1="136" x2="348" y2="136" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="338" y1="142" x2="348" y2="142" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="338" y1="148" x2="348" y2="148" stroke="#94a3b8" strokeWidth="1.5" />

        {/* Headlight */}
        <circle cx="338" cy="118" r="6" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />
        <circle cx="338" cy="118" r="2.5" fill="#ffffff" />

        {/* Rear Light */}
        <rect x="26" y="125" width="4" height="12" rx="1" fill="#ef4444" />

        {/* Wheel 1 (Rear) */}
        <g transform="translate(85, 155)">
          <circle cx="0" cy="0" r="22" fill="#0f172a" />
          <circle cx="0" cy="0" r="13" fill="#475569" />
          <circle cx="0" cy="0" r="5" fill="#e2e8f0" />
          {/* Rims */}
          <line x1="-10" y1="0" x2="10" y2="0" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="0" y1="-10" x2="0" y2="10" stroke="#cbd5e1" strokeWidth="2" />
        </g>

        {/* Wheel 2 (Middle) */}
        <g transform="translate(145, 155)">
          <circle cx="0" cy="0" r="22" fill="#0f172a" />
          <circle cx="0" cy="0" r="13" fill="#475569" />
          <circle cx="0" cy="0" r="5" fill="#e2e8f0" />
          <line x1="-10" y1="0" x2="10" y2="0" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="0" y1="-10" x2="0" y2="10" stroke="#cbd5e1" strokeWidth="2" />
        </g>

        {/* Wheel 3 (Front) */}
        <g transform="translate(295, 155)">
          <circle cx="0" cy="0" r="22" fill="#0f172a" />
          <circle cx="0" cy="0" r="13" fill="#475569" />
          <circle cx="0" cy="0" r="5" fill="#e2e8f0" />
          <line x1="-10" y1="0" x2="10" y2="0" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="0" y1="-10" x2="0" y2="10" stroke="#cbd5e1" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}
