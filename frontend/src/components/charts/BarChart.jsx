import React from 'react';
import { motion } from 'framer-motion';

const BarChart = ({ data, title, xLabel, yLabel, color = '#4f46e5', height = 200, showLabels = true }) => {
  // Find max value for scaling
  const values = data.map(d => d.value);
  const maxValue = Math.max(...values, 0);
  
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
          
          {/* Bars */}
          {data.map((d, i) => {
            const barWidth = 100 / data.length * 0.7; // 70% of available space
            const barSpacing = 100 / data.length;
            const barHeight = (d.value / maxValue) * 100;
            const x = i * barSpacing + (barSpacing - barWidth) / 2;
            const y = 100 - barHeight;
            
            return (
              <motion.rect
                key={i}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={typeof color === 'function' ? color(d, i) : color}
                initial={{ height: 0, y: 100 }}
                animate={{ height: barHeight, y }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                rx="1"
              />
            );
          })}
        </svg>
        
        {/* X-axis labels */}
        {showLabels && (
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            {data.map((d, i) => (
              <div key={i} style={{ width: `${100 / data.length}%`, textAlign: 'center' }}>
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

export default BarChart;