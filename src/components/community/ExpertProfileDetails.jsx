import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, MessageCircle, BookOpen, Award } from 'lucide-react';
import { getEducationalContent } from '../../services/communityService.jsx';
import EducationalContentCard from './EducationalContentCard.jsx';

const ExpertProfileDetails = ({ expert, onBack, onViewContent }) => {
  // Get content authored by this expert
  const expertContent = expert ? 
    getEducationalContent().filter(content => content.author === expert.name) : 
    [];
  
  if (!expert) return null;

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
        <h2 className="text-xl font-semibold text-gray-800">Expert Profile</h2>
      </div>
      
      {/* Expert Profile Card */}
      <div className="p-6 rounded-xl border bg-white">
        <div className="flex items-start space-x-4 mb-6">
          <div className="relative">
            <img 
              src={expert.avatar} 
              alt={expert.name} 
              className="w-20 h-20 rounded-full object-cover"
            />
            {expert.verified && (
              <CheckCircle className="w-6 h-6 text-primary-500 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
            )}
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center mb-1">
              <h3 className="font-semibold text-xl text-gray-800">{expert.name}</h3>
              {expert.verified && (
                <span className="ml-2 text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full">
                  Verified Expert
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-2">{expert.title}</p>
            <span className="text-sm font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              {expert.specialty}
            </span>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-2">About</h4>
          <p className="text-gray-700">{expert.bio}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-lg bg-gray-50">
            <Award className="w-5 h-5 text-primary-500 mx-auto mb-1" />
            <p className="text-sm font-medium">Credentials</p>
            <p className="text-xs text-gray-500">Board Certified</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-50">
            <BookOpen className="w-5 h-5 text-primary-500 mx-auto mb-1" />
            <p className="text-sm font-medium">Articles</p>
            <p className="text-xs text-gray-500">{expertContent.length} published</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-50">
            <MessageCircle className="w-5 h-5 text-primary-500 mx-auto mb-1" />
            <p className="text-sm font-medium">Consult</p>
            <p className="text-xs text-gray-500">Available</p>
          </div>
        </div>
      </div>
      
      {/* Expert's Content */}
      {expertContent.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Articles by {expert.name.split(' ')[0]}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expertContent.map(content => (
              <EducationalContentCard 
                key={content.id} 
                content={content} 
                onClick={onViewContent}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Contact Section */}
      <div className="p-6 rounded-xl border bg-primary-50">
        <h3 className="font-semibold text-gray-800 mb-3">Have a Question?</h3>
        <p className="text-gray-700 mb-4">
          Connect with {expert.name.split(' ')[0]} through our secure messaging platform for personalized health advice.
        </p>
        <button className="px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-medium flex items-center mx-auto">
          <MessageCircle className="w-4 h-4 mr-2" />
          <span>Send a Message</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ExpertProfileDetails;