import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, MessageCircle, Shield, Search, Filter, Bell, ChevronRight } from 'lucide-react';
import SupportCircleCard from '../components/community/SupportCircleCard.jsx';
import EducationalContentCard from '../components/community/EducationalContentCard.jsx';
import DiscussionTopicCard from '../components/community/DiscussionTopicCard.jsx';
import ExpertProfileCard from '../components/community/ExpertProfileCard.jsx';
import SupportCircleDetails from '../components/community/SupportCircleDetails.jsx';
import EducationalArticle from '../components/community/EducationalArticle.jsx';
import DiscussionThread from '../components/community/DiscussionThread.jsx';
import ExpertProfileDetails from '../components/community/ExpertProfileDetails.jsx';
import { getSupportCircles, getEducationalContent, getDiscussionTopics, getExperts, getCircleById, getContentById, getTopicById, getExpertById } from '../services/communityService.jsx';

const CommunityPage = () => {
  // Data states
  const [supportCircles, setSupportCircles] = useState([]);
  const [educationalContent, setEducationalContent] = useState([]);
  const [featuredContent, setFeaturedContent] = useState([]);
  const [discussionTopics, setDiscussionTopics] = useState([]);
  const [experts, setExperts] = useState([]);
  
  // UI states
  const [activeTab, setActiveTab] = useState('circles');
  const [detailView, setDetailView] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  
  // Selected item data
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedExpert, setSelectedExpert] = useState(null);
  
  useEffect(() => {
    // Load data from services
    setSupportCircles(getSupportCircles());
    setEducationalContent(getEducationalContent());
    setFeaturedContent(getEducationalContent(true));
    setDiscussionTopics(getDiscussionTopics());
    setExperts(getExperts());
  }, []);
  
  // Handle item selection and detail view
  useEffect(() => {
    if (!selectedItemId || !detailView) return;
    
    switch (detailView) {
      case 'circle':
        setSelectedCircle(getCircleById(selectedItemId));
        break;
      case 'content':
        setSelectedContent(getContentById(selectedItemId));
        break;
      case 'topic':
        setSelectedTopic(getTopicById(selectedItemId));
        break;
      case 'expert':
        setSelectedExpert(getExpertById(selectedItemId));
        break;
      default:
        break;
    }
  }, [selectedItemId, detailView]);
  
  // Handle circle selection
  const handleCircleClick = (circleId) => {
    setSelectedItemId(circleId);
    setDetailView('circle');
  };
  
  // Handle content selection
  const handleContentClick = (contentId) => {
    setSelectedItemId(contentId);
    setDetailView('content');
  };
  
  // Handle topic selection
  const handleTopicClick = (topicId) => {
    setSelectedItemId(topicId);
    setDetailView('topic');
  };
  
  // Handle expert selection
  const handleExpertClick = (expertId) => {
    setSelectedItemId(expertId);
    setDetailView('expert');
  };
  
  // Handle back button
  const handleBackClick = () => {
    setDetailView(null);
    setSelectedItemId(null);
    setSelectedCircle(null);
    setSelectedContent(null);
    setSelectedTopic(null);
    setSelectedExpert(null);
  };
  return (
    <div className="min-h-screen bg-slate-50 pb-32 md:pb-10">
      <div className="container mx-auto px-4 lg:px-6 max-w-6xl pt-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Community & Education</h1>
        <p className="text-gray-600">Connect with others and learn about your health</p>
      </motion.div>

      {/* Conditional rendering based on detail view */}
      {detailView ? (
        // Detail Views
        <div>
          {detailView === 'circle' && selectedCircle && (
            <SupportCircleDetails 
              circle={selectedCircle} 
              onBack={handleBackClick} 
              onViewTopic={handleTopicClick}
            />
          )}
          
          {detailView === 'content' && selectedContent && (
            <EducationalArticle 
              content={selectedContent} 
              onBack={handleBackClick} 
            />
          )}
          
          {detailView === 'topic' && selectedTopic && (
            <DiscussionThread 
              topic={selectedTopic} 
              onBack={handleBackClick} 
            />
          )}
          
          {detailView === 'expert' && selectedExpert && (
            <ExpertProfileDetails 
              expert={selectedExpert} 
              onBack={handleBackClick} 
              onViewContent={handleContentClick}
            />
          )}
        </div>
      ) : (
        // Main listing views
        <>
          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-3 mb-6"
          >
            <div className="relative flex-grow">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search communities, topics, or content..." 
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
              />
            </div>
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50">
              <Bell className="w-4 h-4 text-gray-600" />
            </button>
          </motion.div>
          
          {/* Navigation Tabs */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex space-x-1 border-b mb-6"
          >
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'circles' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('circles')}
            >
              Support Circles
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'learn' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('learn')}
            >
              Learn
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'discussions' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('discussions')}
            >
              Discussions
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'experts' ? 'text-primary-600 border-b-2 border-primary-500' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('experts')}
            >
              Experts
            </button>
          </motion.div>
          
          <div className="space-y-6">
            {/* Support Circles Tab */}
            {activeTab === 'circles' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Support Circles</h2>
                  <button className="text-sm text-primary-600 flex items-center">
                    View all <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {supportCircles.map(circle => (
                    <SupportCircleCard 
                      key={circle.id} 
                      circle={circle} 
                      onClick={handleCircleClick}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Learn Tab */}
            {activeTab === 'learn' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Featured Content</h2>
                  <button className="text-sm text-primary-600 flex items-center">
                    View all <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {featuredContent.map(content => (
                    <EducationalContentCard 
                      key={content.id} 
                      content={content} 
                      featured={true}
                      onClick={handleContentClick}
                    />
                  ))}
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Recent Articles</h2>
                  <button className="text-sm text-primary-600 flex items-center">
                    Browse library <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {educationalContent.slice(0, 4).map(content => (
                    <EducationalContentCard 
                      key={content.id} 
                      content={content} 
                      onClick={handleContentClick}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Discussions Tab */}
            {activeTab === 'discussions' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Active Discussions</h2>
                  <button className="text-sm text-primary-600 flex items-center">
                    Start new topic <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {discussionTopics.map(topic => (
                    <DiscussionTopicCard 
                      key={topic.id} 
                      topic={topic} 
                      onClick={handleTopicClick}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Experts Tab */}
            {activeTab === 'experts' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Featured Experts</h2>
                  <button className="text-sm text-primary-600 flex items-center">
                    View all experts <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {experts.map(expert => (
                    <ExpertProfileCard 
                      key={expert.id} 
                      expert={expert} 
                      onClick={handleExpertClick}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default CommunityPage;
