import React, { useEffect, useState, useRef } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';

// Improved easing function (easeOutQuad)
const easeOutQuad = (t) => t * (2 - t);

export default function GradientGauge ( props: {
  value, 
  maxValue?,
  size?: number,
  className?: string,
  colors?: string[],
  children?: React.ReactNode;
}){
  const [displayValue, setDisplayValue] = useState(0);
  const animationRef = useRef(null);
  const targetValue = useRef(0);
  const startValue = useRef(0);
  const startTime = useRef(null);
  const gradientId = useRef(`gradient-${Math.random().toString(36).substr(2, 9)}`);
  
  const value = props.value;
  const maxValue = props.maxValue || 100;
  const size = props.size || 100;
  const tailwindClasses = props.className || "";
  const colors = props.colors || ["#316AA2", "#3bc4ff"];

  const stops = colors.map((color, index) => (
    <stop 
      key={index}
      offset={`${(index / (colors.length - 1)) * 100}%`}
      stopColor={color}
    />
  ));

  useEffect(() => {
    // When value changes, setup new animation
    targetValue.current = value;
    startValue.current = displayValue;
    startTime.current = null;

    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      
      const duration = 1500; // 1.5 second animation
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Apply easing function to progress
      const easedProgress = easeOutQuad(progress);
      
      // Calculate new value
      const newValue = startValue.current + 
        (targetValue.current - startValue.current) * easedProgress;
      
      setDisplayValue(newValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value]);

  return (
    <div style={{ width: size+"px", height: size+"px"}} className={tailwindClasses + " rounded-full surrounding-shadow"}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CircularProgressbarWithChildren
          strokeWidth={Math.round(size*12/100)}
          background={true}
          backgroundPadding={Math.round(size*8/100)}
          value={displayValue}
          maxValue={maxValue}
          styles={buildStyles({
            pathColor: `url(#${gradientId.current})`, // Use unique gradient ID
            textColor: '#000',
            trailColor: '#eee',
            backgroundColor: '#fff',
            pathTransition: 'none',
          })}
        >
          { props.children ? 
            <div>{props.children}</div> : 
            <div style={{ fontSize: `${Math.round(size)*32/100}px` }} className="font-bold">
              {Math.round(displayValue)}
            </div>
          }
        </CircularProgressbarWithChildren>
      </motion.div>

      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id={gradientId.current} gradientTransform="rotate(90)">
            {stops}
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
