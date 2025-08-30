// Mock data for community and education features

// Support Circles
const supportCircles = [
  {
    id: 'diabetes',
    name: 'Diabetes Management',
    description: 'Connect with others managing diabetes for support and tips.',
    members: 1243,
    topics: 87,
    icon: 'Activity',
    color: 'primary',
  },
  {
    id: 'weight-loss',
    name: 'Weight Loss Journey',
    description: 'Share your weight loss experiences and get motivation.',
    members: 2156,
    topics: 134,
    icon: 'Scale',
    color: 'teal',
  },
  {
    id: 'heart-health',
    name: 'Heart Health',
    description: 'Discuss strategies for maintaining cardiovascular health.',
    members: 876,
    topics: 62,
    icon: 'Heart',
    color: 'red',
  },
  {
    id: 'nutrition',
    name: 'Nutrition & Diet',
    description: 'Exchange healthy recipes and nutrition advice.',
    members: 1892,
    topics: 156,
    icon: 'Apple',
    color: 'green',
  },
  {
    id: 'fitness',
    name: 'Fitness Enthusiasts',
    description: 'Share workout routines and fitness achievements.',
    members: 1567,
    topics: 112,
    icon: 'Dumbbell',
    color: 'accent',
  },
  {
    id: 'mental-wellness',
    name: 'Mental Wellness',
    description: 'Support for stress management and mental health.',
    members: 1324,
    topics: 98,
    icon: 'Brain',
    color: 'purple',
  },
];

// Educational Content
const educationalContent = [
  {
    id: 'diabetes-101',
    title: 'Understanding Diabetes',
    description: 'Learn the basics of diabetes management and prevention.',
    category: 'Diabetes',
    readTime: '10 min',
    author: 'Dr. Sarah Johnson',
    authorTitle: 'Endocrinologist',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIwMCAxNzIuMDkxIDE4Mi4wOTEgMTkwIDE2MCAxOTBDMTM3LjkwOSAxOTAgMTIwIDE3Mi4wOTEgMTIwIDE1MEMxMjAgMTI3LjkwOSAxMzcuOTA5IDExMCAxNjAgMTEwQzE4Mi4wOTEgMTEwIDIwMCAxMjcuOTA5IDIwMCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yODAgMTkwSDEyMFYyMDBIMjgwVjE5MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+',
    featured: true,
  },
  {
    id: 'nutrition-myths',
    title: 'Common Nutrition Myths Debunked',
    description: 'Separating fact from fiction in the world of nutrition.',
    category: 'Nutrition',
    readTime: '8 min',
    author: 'Maya Patel, RD',
    authorTitle: 'Registered Dietitian',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRUZGNkZGIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEyMCIgcj0iMjAiIGZpbGw9IiNGRjY5QjQiLz4KPGNpcmNsZSBjeD0iMjUwIiBjeT0iMTUwIiByPSIxNSIgZmlsbD0iI0Y1OUU0MiIvPgo8Y2lyY2xlIGN4PSIzMDAiIGN5PSIxMDAiIHI9IjEwIiBmaWxsPSIjMzMzOEJFIi8+CjxwYXRoIGQ9Ik0xMDAgMjAwSDMwMFYyMTBIMTAwVjIwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+',
    featured: true,
  },
  {
    id: 'heart-health-tips',
    title: '5 Simple Habits for Better Heart Health',
    description: 'Easy lifestyle changes to improve your cardiovascular health.',
    category: 'Heart Health',
    readTime: '6 min',
    author: 'Dr. Michael Chen',
    authorTitle: 'Cardiologist',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkVGMkY0Ii8+CjxwYXRoIGQ9Ik0yMDAgMTAwQzIyNy42MTQgMTAwIDI1MCAxMjIuMzg2IDI1MCAxNTBDMjUwIDE3Ny42MTQgMjI3LjYxNCAyMDAgMjAwIDIwMEMxNzIuMzg2IDIwMCAxNTAgMTc3LjYxNCAxNTAgMTUwQzE1MCAxMjIuMzg2IDE3Mi4zODYgMTAwIDIwMCAxMDBaIiBmaWxsPSIjRUY0NDQ0Ii8+CjxwYXRoIGQ9Ik0xODAgMTQwSDIyMFYxNjBIMTgwVjE0MFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==',
    featured: false,
  },
  {
    id: 'stress-management',
    title: 'Effective Stress Management Techniques',
    description: 'Practical approaches to reduce stress in your daily life.',
    category: 'Mental Wellness',
    readTime: '7 min',
    author: 'Dr. Lisa Wong',
    authorTitle: 'Psychologist',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjBGOUZGIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiM2MzY2RjEiLz4KPGNpcmNsZSBjeD0iMjAwIiBjeT0iMTUwIiByPSIyMCIgZmlsbD0id2hpdGUiLz4KPC9zdmc+',
    featured: false,
  },
  {
    id: 'exercise-beginners',
    title: 'Exercise Guide for Beginners',
    description: 'How to start a sustainable exercise routine.',
    category: 'Fitness',
    readTime: '9 min',
    author: 'James Rodriguez',
    authorTitle: 'Certified Personal Trainer',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkVGN0VEIi8+CjxyZWN0IHg9IjE1MCIgeT0iMTIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjYwIiByeD0iMTAiIGZpbGw9IiNGNTlFNDIiLz4KPGNpcmNsZSBjeD0iMTcwIiBjeT0iMTQwIiByPSI4IiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGN4PSIyMzAiIGN5PSIxNDAiIHI9IjgiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==',
    featured: false,
  },
  {
    id: 'weight-loss-myths',
    title: 'Weight Loss Myths You Should Stop Believing',
    description: 'Evidence-based approaches to sustainable weight management.',
    category: 'Weight Loss',
    readTime: '11 min',
    author: 'Dr. Emily Carter',
    authorTitle: 'Obesity Medicine Specialist',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjBGREY0Ii8+CjxwYXRoIGQ9Ik0xNTAgMTIwSDI1MFYxODBIMTUwVjEyMFoiIGZpbGw9IiMxMEI5ODEiLz4KPGNpcmNsZSBjeD0iMTgwIiBjeT0iMTQwIiByPSI4IiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGN4PSIyMjAiIGN5PSIxNDAiIHI9IjgiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNzAgMTYwSDIzMFYxNzBIMTcwVjE2MFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==',
    featured: true,
  },
];

// Discussion Topics
const discussionTopics = [
  {
    id: 'topic-1',
    title: 'How do you manage blood sugar spikes after meals?',
    author: 'DiabetesFighter',
    circle: 'diabetes',
    replies: 24,
    views: 342,
    lastActivity: '2023-06-15T14:23:00Z',
    pinned: true,
  },
  {
    id: 'topic-2',
    title: 'Share your favorite low-carb recipes!',
    author: 'HealthyEater',
    circle: 'nutrition',
    replies: 47,
    views: 512,
    lastActivity: '2023-06-14T09:15:00Z',
    pinned: false,
  },
  {
    id: 'topic-3',
    title: 'Tips for staying motivated during weight loss plateaus',
    author: 'FitnessJourney',
    circle: 'weight-loss',
    replies: 36,
    views: 428,
    lastActivity: '2023-06-16T11:30:00Z',
    pinned: false,
  },
  {
    id: 'topic-4',
    title: 'How has meditation improved your health?',
    author: 'MindfulLiving',
    circle: 'mental-wellness',
    replies: 19,
    views: 267,
    lastActivity: '2023-06-13T16:45:00Z',
    pinned: false,
  },
  {
    id: 'topic-5',
    title: 'Heart-healthy meal planning strategies',
    author: 'CardioWarrior',
    circle: 'heart-health',
    replies: 28,
    views: 356,
    lastActivity: '2023-06-15T08:20:00Z',
    pinned: true,
  },
];

// Expert Profiles
const experts = [
  {
    id: 'expert-1',
    name: 'Dr. Sarah Johnson',
    title: 'Endocrinologist',
    specialty: 'Diabetes Management',
    bio: 'Board-certified endocrinologist with 15 years of experience in diabetes care.',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yNSA3NUMyNSA2NS4wNTg5IDMzLjA1ODkgNTcgNDMgNTdINTdDNjYuOTQxMSA1NyA3NSA2NS4wNTg5IDc1IDc1VjgwSDI1Vjc1WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4=',
    verified: true,
  },
  {
    id: 'expert-2',
    name: 'Maya Patel, RD',
    title: 'Registered Dietitian',
    specialty: 'Nutrition Counseling',
    bio: 'Specializes in personalized nutrition plans for chronic disease management.',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjRkVGMkY0Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSIjRkY2OUI0Ii8+CjxwYXRoIGQ9Ik0yNSA3NUMyNSA2NS4wNTg5IDMzLjA1ODkgNTcgNDMgNTdINTdDNjYuOTQxMSA1NyA3NSA2NS4wNTg5IDc1IDc1VjgwSDI1Vjc1WiIgZmlsbD0iI0ZGNjlCNCIvPgo8L3N2Zz4=',
    verified: true,
  },
  {
    id: 'expert-3',
    name: 'Dr. Michael Chen',
    title: 'Cardiologist',
    specialty: 'Preventive Cardiology',
    bio: 'Focuses on lifestyle interventions for heart disease prevention.',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjRjBGOUZGIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSIjNjM2NkYxIi8+CjxwYXRoIGQ9Ik0yNSA3NUMyNSA2NS4wNTg5IDMzLjA1ODkgNTcgNDMgNTdINTdDNjYuOTQxMSA1NyA3NSA2NS4wNTg5IDc1IDc1VjgwSDI1Vjc1WiIgZmlsbD0iIzYzNjZGMSIvPgo8L3N2Zz4=',
    verified: true,
  },
  {
    id: 'expert-4',
    name: 'James Rodriguez',
    title: 'Certified Personal Trainer',
    specialty: 'Adaptive Fitness',
    bio: 'Develops exercise programs for individuals with chronic health conditions.',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjRkVGN0VEIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSIjRjU5RTQyIi8+CjxwYXRoIGQ9Ik0yNSA3NUMyNSA2NS4wNTg5IDMzLjA1ODkgNTcgNDMgNTdINTdDNjYuOTQxMSA1NyA3NSA2NS4wNTg5IDc1IDc1VjgwSDI1Vjc1WiIgZmlsbD0iI0Y1OUU0MiIvPgo8L3N2Zz4=',
    verified: true,
  },
];

// Export functions to access the mock data
export const getSupportCircles = () => supportCircles;

// Get a specific support circle by ID
export const getCircleById = (id) => {
  return supportCircles.find(circle => circle.id === id);
};

export const getEducationalContent = (featured = false) => {
  if (featured) {
    return educationalContent.filter(content => content.featured);
  }
  return educationalContent;
};

// Get a specific educational content by ID
export const getContentById = (id) => {
  return educationalContent.find(content => content.id === id);
};

export const getDiscussionTopics = (circleId = null) => {
  if (circleId) {
    return discussionTopics.filter(topic => topic.circle === circleId);
  }
  return discussionTopics;
};

// Get a specific discussion topic by ID
export const getTopicById = (id) => {
  return discussionTopics.find(topic => topic.id === id);
};

export const getExperts = () => experts;

// Get a specific expert by ID
export const getExpertById = (id) => {
  return experts.find(expert => expert.id === id);
};