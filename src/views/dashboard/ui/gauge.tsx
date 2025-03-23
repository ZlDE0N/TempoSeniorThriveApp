import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GaugeProps {
  value: number; // Value between 0-100
  label?: string;
  color?: string;
  className?: string;
}

export default function Gauge({
  value,
  label = "Progress",
  color = "#3761D5",
  className,
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

  // Calculate color based on score
  const getScoreColor = (score: number) => {
    if (score < 40) return "#e74c3c"; // Red for low scores
    if (score < 70) return "#f39c12"; // Orange/Yellow for medium scores
    return "#2ecc71"; // Green for high scores
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg width="100" height="100" viewBox="0 0 140 140">
        {/* Background Circle */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="#e0e0e0"
          strokeWidth="12"
          fill="#f8f9fa"
        />

        {/* Progress Circle with Glow */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke={`url(#scoreGradient)`}
          strokeWidth="14"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{
            filter: `drop-shadow(0 0 10px rgba(122, 167, 255, 0.7))`,
            transition: "stroke-dashoffset 0.5s ease-out",
          }}
        />

        {/* Gradient Definition - Dynamic based on score */}
        <defs>
          <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={getScoreColor(animatedValue)} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>

        {/* Main Value - Removed from here, now displayed below the gauge */}

        {/* Label */}
        {label && (
          <text
            x="70"
            y="75"
            textAnchor="middle"
            fontSize="14"
            fontWeight="medium"
            fill="#555"
          >
            {label}
          </text>
        )}
      </svg>
    </div>
  );
}
