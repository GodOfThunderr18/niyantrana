# Niyantrana - Your Personalized Metabolic Wellness Companion

A sophisticated, responsive, and habit-forming React Progressive Web App (PWA) that serves as a personalized early warning and management system for metabolic diseases, specifically targeting fatty liver, type-2 diabetes, and hypertension for an Indian user base.

## 🌟 Vision

Move beyond simple data tracking and create an intelligent, proactive companion that empowers users to understand their health, make better daily decisions, and build lasting healthy habits through a supportive and engaging experience.

## 🎨 Design Philosophy

The application's design is **Calm, Clear, and Empowering** with:
- **Modern, clean, and minimalist aesthetic**
- **Glassmorphism effects** for login and sign-up screens
- **Soft-focus, abstract natural backgrounds** for serenity and trust
- **Soft blues, greens, and whites** as base colors
- **Warm oranges and teals** as accent colors for positive reinforcement
- **Subtle 2D micro-interactions** and smooth animations
- **Lottie animations** for onboarding and achievements

## 🚀 Features

### 🔐 Authentication & Onboarding
- **Glassmorphism UI** with beautiful natural backgrounds
- **Multi-step conversational onboarding** (one question per screen)
- **Foundational data collection**: Name, Age, Sex, Height, Weight, Family History, Smoking/Alcohol status
- **Educational explanations** for why each data point matters
- **Permissions priming** for Health Connect/HealthKit integration

### 📊 Main Dashboard
- **Unified Metabolic Score**: Dynamic circular progress bar (0-100) with color-coded feedback
- **Today's Focus Card**: AI-powered actionable insight for the day
- **Daily Progress Rings**: Visual progress for Calories, Steps, and Sleep
- **Quick-Log FAB**: Floating action button for meal, activity, and vital logging
- **Recent Achievements**: Gamification elements with points and streaks

### 🤖 AI Chatbot Companion
- **Persistent chat icon** in bottom corner
- **Full-screen conversational interface**
- **Natural language logging** for meals, vitals, and activities
- **Personalized Q&A** referencing user health data
- **Proactive coaching** with motivational messages
- **Nutritionist & Recipe Helper** with Indian food database

### 📝 Smart Logging Features
- **Meal Logging**: Search with auto-complete, recent/frequent tabs, photo recognition
- **Vitals Logging**: Blood pressure, glucose with immediate visual feedback
- **Activity Tracking**: Steps, exercise, sleep patterns

### 📈 Trends & Insights
- **Correlated Insights**: Explicit connections between data points
- **Long-term Risk Trajectory**: Metabolic score over time
- **Detailed drill-down charts** for all key metrics
- **Animated chart presentations**

### 🏆 Gamification & Engagement
- **Points & Levels System**: Wellness Novice → Explorer → Champion → Master
- **Achievements Gallery**: Earned badges with unlock previews
- **Streak Tracking**: Daily logging and activity streaks
- **Personalized Quests**: Weekly challenges and goals

### 👥 Community & Education
- **Anonymous Support Circles**: Topic-based forums
- **Educational Content Hub**: Expert-vetted articles and learning paths
- **Doctor's Visit Report Generator**: Clean, shareable PDF summaries

### ⚙️ Profile & Settings
- **Personal details management**
- **Connected devices management**
- **Goal customization**
- **Notification preferences**
- **Theme selection**

## 🛠️ Technology Stack

- **Frontend**: React 18 with Hooks
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **Charts**: Recharts for data visualization
- **State Management**: Zustand for global state
- **Forms**: React Hook Form for form handling
- **Icons**: Lucide React for consistent iconography
- **PWA**: Service Worker support and offline capabilities
- **Routing**: React Router DOM for navigation

## 📱 PWA Features

- **Installable** on mobile and desktop
- **Offline support** with service worker
- **App-like experience** with standalone display
- **Responsive design** for all screen sizes
- **Fast loading** with optimized assets

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd niyantrana
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### 🎯 Standalone Application

This application runs entirely in the browser using localStorage for data persistence. **No backend server, database, or API keys are required!** All features including:
- User authentication and profiles
- Health data logging and tracking
- AI chat responses
- Community features
- Gamification system

are implemented with mock data and local storage, making it perfect for development, testing, and demonstration purposes.

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

## 🎯 Key Components

- **`App.js`**: Main application with routing and authentication
- **`AuthContext.js`**: User authentication and state management
- **`DashboardPage.js`**: Central hub with metabolic score and daily focus
- **`OnboardingPage.js`**: Multi-step user onboarding flow
- **`LoginPage.js`**: Beautiful glassmorphism authentication
- **`Navigation.js`**: Bottom navigation with floating action buttons

## 🎨 Customization

### Colors
The app uses a custom Tailwind color palette:
- **Primary**: Soft blues (`primary-50` to `primary-900`)
- **Secondary**: Gentle greens (`secondary-50` to `secondary-900`)
- **Accent**: Warm oranges (`accent-50` to `accent-900`)
- **Teal**: Complementary teals (`teal-50` to `teal-900`)
- **Wellness Scores**: Contextual colors for health metrics

### Components
Reusable component classes:
- **`.glassmorphism`**: Frosted glass effect
- **`.btn-primary`**: Primary button with hover effects
- **`.btn-secondary`**: Secondary button with backdrop blur
- **`.card-hover`**: Hover animations for cards

## 🔮 Future Enhancements

- **Enhanced AI responses** with more sophisticated mock conversations
- **Health Connect/HealthKit** integration for real device data
- **Advanced analytics** and trend predictions
- **Expanded community features** and challenges
- **Wearable device** integration
- **Export/import** functionality for health data
- **Offline-first** PWA capabilities with better caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern wellness apps and medical interfaces
- **Icons**: Lucide React for beautiful, consistent iconography
- **Animations**: Framer Motion for delightful micro-interactions
- **Community**: Open source contributors and health tech enthusiasts

---

**Built with ❤️ for better metabolic health and wellness**
