import React, { useEffect, useRef, useState } from "react";

interface GaugeProps {
  value: number; // Value between 0-100
  label?: string;
  color?: string;
}

export default function Gauge({
  value,
  label = "Progress",
  color = "#3761D5",
}: GaugeProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  const [animatedValue, setAnimatedValue] = useState(0);

  // Smooth animation for value updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValue((prev) => {
        const step = (value - prev) * 0.1;
        return Math.abs(step) < 0.5 ? value : prev + step;
      });
    }, 32);

    return () => clearInterval(interval);
  }, [value]);

  const progress = (animatedValue / 100) * circumference;

  return (
    <svg width="80" height="80" viewBox="0 0 140 140">
      {/* Background Circle */}
      <circle
        cx="70"
        cy="70"
        r={radius}
        stroke="#e0e0e0"
        strokeWidth="12"
        fill="#888888"
      />

      {/* Progress Circle with Glow */}
      <circle
        cx="70"
        cy="70"
        r={radius}
        stroke={`url(#gradient)`}
        strokeWidth="14"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        transform="rotate(-90 70 70)"
        style={{
          filter: `drop-shadow(0 0 10px #7aa7ff)`,
          transition: "stroke-dashoffset 0.3s ease-out",
        }}
      />

      {/* Gradient Definition */}
      <defs>
        <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#7aa7ff" />
        </linearGradient>
      </defs>

      {/* Main Value */}
      <text
        x="70"
        y="73"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="35"
        fontWeight="bold"
        fill="#ffffff"
      >
        {Math.round(animatedValue)}
      </text>

      {/* Label */}
      {label && (
        <text
          x="70"
          y="100"
          textAnchor="middle"
          fontSize="12"
          fill="#777"
        >
          {label}
        </text>
      )}
    </svg>
  );
}

