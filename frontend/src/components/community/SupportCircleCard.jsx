import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Scale, Heart, Apple, Dumbbell, Brain, Users, ArrowRight } from 'lucide-react';

const SupportCircleCard = ({ circle, onClick }) => {
  // Map circle icon names to Lucide icon components
  const getIcon = (iconName) => {
    const icons = {
      'Activity': Activity,
      'Scale': Scale,
      'Heart': Heart,
      'Apple': Apple,
      'Dumbbell': Dumbbell,
      'Brain': Brain,
      'Users': Users,
    };
    
    const IconComponent = icons[iconName] || Users;
    return <IconComponent className="w-5 h-5" />;
  };

  // Map color names to Tailwind CSS classes
  const getColorClass = (color) => {
    const colorMap = {
      'primary': 'bg-primary-50 text-primary-600 border-primary-200',
      'teal': 'bg-teal-50 text-teal-600 border-teal-200',
      'red': 'bg-red-50 text-red-600 border-red-200',
      'green': 'bg-green-50 text-green-600 border-green-200',
      'accent': 'bg-accent-50 text-accent-600 border-accent-200',
      'purple': 'bg-purple-50 text-purple-600 border-purple-200',
    };
    
    return colorMap[color] || 'bg-gray-50 text-gray-600 border-gray-200';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-xl border p-4 cursor-pointer transition-all ${getColorClass(circle.color)}`}
      onClick={() => onClick(circle.id)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          {getIcon(circle.icon)}
          <h3 className="font-semibold">{circle.name}</h3>
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-50">
          {circle.members.toLocaleString()} members
        </span>
      </div>
      
      <p className="text-sm mb-3 opacity-80">{circle.description}</p>
      
      <div className="flex justify-between items-center text-xs">
        <span>{circle.topics} topics</span>
        <div className="flex items-center space-x-1 font-medium">
          <span>Join circle</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
};

export default SupportCircleCard;