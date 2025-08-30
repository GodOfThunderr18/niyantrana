import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, ThumbsUp, Flag, Share2, Send } from 'lucide-react';
import { getCircleById } from '../../services/communityService.jsx';

const DiscussionThread = ({ topic, onBack }) => {
  const [replyText, setReplyText] = useState('');
  const circle = topic ? getCircleById(topic.circle) : null;
  
  // Mock replies for the discussion
  const mockReplies = [
    {
      id: 'reply-1',
      author: 'HealthyLiving',
      content: "I've found that taking a short walk after meals helps a lot with managing post-meal blood sugar spikes. Even just 10-15 minutes makes a difference for me.",
      likes: 12,
      timestamp: '2023-06-15T15:30:00Z',
      isVerified: false,
    },
    {
      id: 'reply-2',
      author: 'Dr. Michael Chen',
      content: 'Great question! Post-meal blood glucose spikes are common. Some evidence-based strategies include: 1) Consider the order you eat food (vegetables and protein before carbs), 2) Include protein and healthy fats with carbs to slow absorption, 3) Light physical activity after eating, 4) Stay hydrated, and 5) Consider discussing meal-time insulin adjustments with your healthcare provider if spikes remain problematic.',
      likes: 28,
      timestamp: '2023-06-15T16:45:00Z',
      isVerified: true,
      isExpert: true,
      expertTitle: 'Endocrinologist',
    },
    {
      id: 'reply-3',
      author: 'GlucoseWarrior',
      content: "I've been using a continuous glucose monitor for the past 6 months and it's been eye-opening to see how different foods affect my levels. I've learned that pairing carbs with protein and fat really helps reduce spikes for me personally.",
      likes: 8,
      timestamp: '2023-06-15T18:20:00Z',
      isVerified: false,
    },
  ];
  
  // Format timestamp
  const formatTimestamp = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Handle reply submission
  const handleSubmitReply = () => {
    if (replyText.trim() === '') return;
    
    // In a real app, this would send the reply to the backend
    console.log('Submitting reply:', replyText);
    
    // Clear the input field
    setReplyText('');
  };
  
  if (!topic) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      {/* Thread Header */}
      <div className="p-4 border-b">
        <div className="flex items-center mb-4">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-700 mr-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">{topic.title}</h2>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
              {topic.author[0]}
            </div>
            <div>
              <p className="text-sm font-medium">{topic.author}</p>
              <p className="text-xs text-gray-500">{formatTimestamp(topic.lastActivity)}</p>
            </div>
          </div>
          
          {circle && (
            <span 
              className={`text-xs px-2 py-1 rounded-full bg-${circle.color}-50 text-${circle.color}-600`}
            >
              {circle.name}
            </span>
          )}
        </div>
      </div>
      
      {/* Thread Actions */}
      <div className="flex border-b p-2 bg-gray-50">
        <button className="flex items-center text-xs text-gray-600 px-3 py-1 rounded-full hover:bg-gray-100">
          <ThumbsUp className="w-3 h-3 mr-1" />
          <span>Like</span>
        </button>
        <button className="flex items-center text-xs text-gray-600 px-3 py-1 rounded-full hover:bg-gray-100">
          <Share2 className="w-3 h-3 mr-1" />
          <span>Share</span>
        </button>
        <button className="flex items-center text-xs text-gray-600 px-3 py-1 rounded-full hover:bg-gray-100">
          <Flag className="w-3 h-3 mr-1" />
          <span>Report</span>
        </button>
      </div>
      
      {/* Replies */}
      <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
        {mockReplies.map(reply => (
          <div key={reply.id} className="p-3 rounded-lg bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium mr-2">
                  {reply.author[0]}
                </div>
                <div>
                  <div className="flex items-center">
                    <p className="text-sm font-medium">{reply.author}</p>
                    {reply.isVerified && (
                      <span className="ml-1 text-xs bg-primary-50 text-primary-600 px-1.5 py-0.5 rounded-full">
                        Verified
                      </span>
                    )}
                    {reply.isExpert && (
                      <span className="ml-1 text-xs bg-accent-50 text-accent-600 px-1.5 py-0.5 rounded-full">
                        Expert
                      </span>
                    )}
                  </div>
                  {reply.expertTitle && (
                    <p className="text-xs text-gray-500">{reply.expertTitle}</p>
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-500">{formatTimestamp(reply.timestamp)}</span>
            </div>
            
            <p className="text-sm text-gray-700 mb-2">{reply.content}</p>
            
            <div className="flex items-center text-xs text-gray-500">
              <button className="flex items-center hover:text-primary-600">
                <ThumbsUp className="w-3 h-3 mr-1" />
                <span>{reply.likes}</span>
              </button>
              <button className="ml-3 flex items-center hover:text-primary-600">
                <MessageSquare className="w-3 h-3 mr-1" />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Reply Input */}
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium mr-2">
            U
          </div>
          <div className="flex-grow relative">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="w-full pl-3 pr-10 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
            />
            <button 
              onClick={handleSubmitReply}
              disabled={replyText.trim() === ''}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-primary-600 disabled:text-gray-300"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DiscussionThread;