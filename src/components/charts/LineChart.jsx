import React from 'react';
import { motion } from 'framer-motion';

const LineChart = ({ data, title, xLabel, yLabel, color = '#4f46e5', height = 200, showLabels = true }) => {
  // Find min and max values for scaling
  const values = data.map(d => d.value);
  const maxValue = Math.max(...values, 0);
  const minValue = Math.min(...values, 0);
  const range = maxValue - minValue;
  
  // Calculate points for the polyline
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((d.value - minValue) / range) * 100;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div className="w-full">
      {title && <h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3>}
      
      <div className="relative" style={{ height: `${height}px` }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="0" x2="100" y2="0" stroke="#e5e7eb" strokeWidth="0.5" />
          <line x1="0" y1="25" x2="100" y2="25" stroke="#e5e7eb" strokeWidth="0.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#e5e7eb" strokeWidth="0.5" />
          <line x1="0" y1="75" x2="100" y2="75" stroke="#e5e7eb" strokeWidth="0.5" />
          <line x1="0" y1="100" x2="100" y2="100" stroke="#e5e7eb" strokeWidth="0.5" />
          
          {/* Line chart */}
          <motion.polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Data points */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = 100 - ((d.value - minValue) / range) * 100;
            
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="2"
                fill={color}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + (i * 0.1), duration: 0.3 }}
              />
            );
          })}
        </svg>
        
        {/* X-axis labels */}
        {showLabels && (
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            {data.map((d, i) => (
              <div key={i} style={{ width: `${100 / data.length}%`, textAlign: i === 0 ? 'left' : i === data.length - 1 ? 'right' : 'center' }}>
                {d.label}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Axis labels */}
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        {xLabel && <div className="text-center w-full">{xLabel}</div>}
        {yLabel && <div className="-rotate-90 absolute -left-6 top-1/2 transform -translate-y-1/2">{yLabel}</div>}
      </div>
    </div>
  );
};

export default LineChart;