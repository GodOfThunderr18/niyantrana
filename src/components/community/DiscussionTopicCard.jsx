import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Eye, Clock, Pin } from 'lucide-react';
import { getCircleById } from '../../services/communityService.jsx';

const DiscussionTopicCard = ({ topic, onClick }) => {
  const circle = getCircleById(topic.circle);
  
  // Format the last activity time
  const formatLastActivity = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="p-4 border rounded-xl bg-white cursor-pointer transition-all hover:shadow-sm"
      onClick={() => onClick(topic.id)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-800">
          {topic.pinned && (
            <Pin className="w-3 h-3 inline-block mr-1 text-primary-500" />
          )}
          {topic.title}
        </h3>
        <span 
          className={`text-xs px-2 py-0.5 rounded-full ${circle ? `bg-${circle.color}-50 text-${circle.color}-600` : 'bg-gray-100 text-gray-600'}`}
        >
          {circle ? circle.name : 'General'}
        </span>
      </div>
      
      <div className="flex items-center text-xs text-gray-500 mb-3">
        <span className="mr-3">By {topic.author}</span>
        <div className="flex items-center mr-3">
          <MessageSquare className="w-3 h-3 mr-1" />
          <span>{topic.replies}</span>
        </div>
        <div className="flex items-center mr-3">
          <Eye className="w-3 h-3 mr-1" />
          <span>{topic.views}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          <span>{formatLastActivity(topic.lastActivity)}</span>
        </div>
      </div>
      
      <div className="text-xs font-medium text-primary-600">
        View discussion
      </div>
    </motion.div>
  );
};

export default DiscussionTopicCard;