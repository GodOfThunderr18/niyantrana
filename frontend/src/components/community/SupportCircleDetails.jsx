import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, MessageSquare, Bell, BellOff, Plus, Filter } from 'lucide-react';
import { getDiscussionTopics } from '../../services/communityService.jsx';
import DiscussionTopicCard from './DiscussionTopicCard.jsx';

const SupportCircleDetails = ({ circle, onBack, onViewTopic }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  
  // Get topics for this circle
  const topics = circle ? getDiscussionTopics(circle.id) : [];
  
  if (!circle) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-700 mr-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">{circle.name}</h2>
      </div>
      
      {/* Circle Info Card */}
      <div className={`p-6 rounded-xl border-2 ${`border-${circle.color}-200 bg-${circle.color}-50`}`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">{circle.name}</h3>
            <p className="text-gray-700">{circle.description}</p>
          </div>
          <div className={`p-3 rounded-full ${`bg-${circle.color}-100 text-${circle.color}-600`}`}>
            {circle.icon === 'Activity' && <Users className="w-6 h-6" />}
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm mb-4">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1 text-gray-500" />
            <span>{circle.members.toLocaleString()} members</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-1 text-gray-500" />
            <span>{circle.topics} topics</span>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => setIsJoined(!isJoined)}
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${isJoined ? 'bg-gray-200 text-gray-800' : `bg-${circle.color}-500 text-white`}`}
          >
            {isJoined ? 'Joined' : 'Join Circle'}
          </button>
          
          <button
            onClick={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50"
          >
            {isNotificationsEnabled ? 
              <BellOff className="w-5 h-5 text-gray-600" /> : 
              <Bell className="w-5 h-5 text-gray-600" />}
          </button>
        </div>
      </div>
      
      {/* Discussion Topics */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Discussions</h3>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
            <button className="px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-sm font-medium flex items-center">
              <Plus className="w-4 h-4 mr-1" />
              <span>New Topic</span>
            </button>
          </div>
        </div>
        
        {topics.length > 0 ? (
          <div className="space-y-3">
            {topics.map(topic => (
              <DiscussionTopicCard 
                key={topic.id} 
                topic={topic} 
                onClick={onViewTopic}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <MessageSquare className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">No discussions yet in this circle</p>
            <button className="mt-3 px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-medium">
              Start a new topic
            </button>
          </div>
        )}
      </div>
      
      {/* Members Preview */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Members</h3>
          <button className="text-sm text-primary-600">View all</button>
        </div>
        
        <div className="flex -space-x-2 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium"
            >
              {String.fromCharCode(65 + i)}
            </div>
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-white bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-medium">
            +{circle.members - 8}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SupportCircleDetails;