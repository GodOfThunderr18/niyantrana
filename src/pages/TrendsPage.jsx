import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Activity, Heart, Calendar, ArrowUpDown, Droplets } from 'lucide-react';

// Import components
import LineChart from '../components/charts/LineChart.jsx';
import BarChart from '../components/charts/BarChart.jsx';
import InsightCard from '../components/InsightCard.jsx';
import RiskTrajectory from '../components/RiskTrajectory.jsx';
import CorrelationCard from '../components/CorrelationCard.jsx';

// Import services
import { 
  getCalorieIntakeTrend, 
  getActivityTrend, 
  getVitalsTrend,
  getCalorieBalance,
  generateInsights,
  calculateRiskTrajectory,
  getCorrelations
} from '../services/trendsService.jsx';

const TrendsPage = () => {
  const [timeRange, setTimeRange] = useState(7); // Default to 7 days
  const [calorieData, setCalorieData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [vitalsData, setVitalsData] = useState([]);
  const [balanceData, setBalanceData] = useState([]);
  const [insights, setInsights] = useState([]);
  const [riskData, setRiskData] = useState({ score: 50, category: 'Moderate', trend: 'Stable' });
  const [correlations, setCorrelations] = useState([]);
  
  useEffect(() => {
    // Load data based on selected time range
    loadData(timeRange);
  }, [timeRange]);
  
  const loadData = (days) => {
    // Get calorie intake trend
    const calorieIntake = getCalorieIntakeTrend(days);
    setCalorieData(calorieIntake.map(item => ({
      label: item.date.split('/')[1], // Just show day
      value: item.calories
    })));
    
    // Get activity trend
    const activity = getActivityTrend(days);
    setActivityData(activity.map(item => ({
      label: item.date.split('/')[1], // Just show day
      value: item.caloriesBurned
    })));
    
    // Get vitals trend
    const vitals = getVitalsTrend(days);
    setVitalsData({
      systolic: vitals.map(item => ({
        label: item.date.split('/')[1],
        value: item.systolic || 0
      })),
      diastolic: vitals.map(item => ({
        label: item.date.split('/')[1],
        value: item.diastolic || 0
      })),
      glucose: vitals.map(item => ({
        label: item.date.split('/')[1],
        value: item.glucose || 0
      }))
    });
    
    // Get calorie balance
    const balance = getCalorieBalance(days);
    setBalanceData(balance.map(item => ({
      date: item.date,
      intake: {
        label: item.date.split('/')[1],
        value: item.intake
      },
      burned: {
        label: item.date.split('/')[1],
        value: item.burned
      },
      net: {
        label: item.date.split('/')[1],
        value: item.net
      }
    })));
    
    // Get insights
    setInsights(generateInsights());
    
    // Get risk trajectory
    setRiskData(calculateRiskTrajectory());
    
    // Get correlations
    setCorrelations(getCorrelations());
  };
  
  return (
    <div className="min-h-screen bg-slate-50 pb-32 md:pb-10">
      <div className="container mx-auto px-4 lg:px-6 max-w-6xl pt-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Trends & Insights</h1>
        <p className="text-gray-600">Discover patterns and correlations in your health data</p>
      </motion.div>
      
      {/* Time range selector */}
      <div className="flex items-center justify-end mb-6">
        <span className="text-sm text-gray-600 mr-2">Time Range:</span>
        <select 
          className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm"
          value={timeRange}
          onChange={(e) => setTimeRange(parseInt(e.target.value))}
        >
          <option value="7">Last 7 Days</option>
          <option value="14">Last 14 Days</option>
          <option value="30">Last 30 Days</option>
        </select>
      </div>

      <div className="space-y-6">
        {/* Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary-500" />
            Personalized Insights
          </h2>
          
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <InsightCard key={index} insight={insight} />
            ))}
          </div>
        </motion.div>
        
        {/* Risk Trajectory */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-primary-500" />
            Health Risk Assessment
          </h2>
          
          <RiskTrajectory riskData={riskData} />
        </motion.div>
        
        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-primary-500" />
            Health Metrics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calorie Intake Chart */}
            <div className="glassmorphism-card p-4">
              <div className="flex items-center mb-2">
                <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                <h3 className="text-lg font-medium text-gray-800">Calorie Intake</h3>
              </div>
              {calorieData.length > 0 ? (
                <BarChart 
                  data={calorieData} 
                  color="#4f46e5"
                  height={180}
                  xLabel="Day"
                  yLabel="Calories"
                />
              ) : (
                <p className="text-gray-500 text-sm italic">No data available</p>
              )}
            </div>
            
            {/* Activity Chart */}
            <div className="glassmorphism-card p-4">
              <div className="flex items-center mb-2">
                <Activity className="w-4 h-4 mr-2 text-primary-500" />
                <h3 className="text-lg font-medium text-gray-800">Activity</h3>
              </div>
              {activityData.length > 0 ? (
                <BarChart 
                  data={activityData} 
                  color="#10b981"
                  height={180}
                  xLabel="Day"
                  yLabel="Calories Burned"
                />
              ) : (
                <p className="text-gray-500 text-sm italic">No data available</p>
              )}
            </div>
            
            {/* Calorie Balance Chart */}
            <div className="glassmorphism-card p-4">
              <div className="flex items-center mb-2">
                <ArrowUpDown className="w-4 h-4 mr-2 text-primary-500" />
                <h3 className="text-lg font-medium text-gray-800">Calorie Balance</h3>
              </div>
              {balanceData.length > 0 ? (
                <LineChart 
                  data={balanceData.map(item => item.net)} 
                  color="#f59e0b"
                  height={180}
                  xLabel="Day"
                  yLabel="Net Calories"
                />
              ) : (
                <p className="text-gray-500 text-sm italic">No data available</p>
              )}
            </div>
            
            {/* Blood Pressure Chart */}
            <div className="glassmorphism-card p-4">
              <div className="flex items-center mb-2">
                <Droplets className="w-4 h-4 mr-2 text-primary-500" />
                <h3 className="text-lg font-medium text-gray-800">Blood Pressure</h3>
              </div>
              {vitalsData.systolic && vitalsData.systolic.length > 0 ? (
                <div>
                  <LineChart 
                    data={vitalsData.systolic} 
                    color="#ef4444"
                    height={90}
                    showLabels={false}
                  />
                  <div className="text-xs text-right text-gray-500 mb-2">Systolic</div>
                  
                  <LineChart 
                    data={vitalsData.diastolic} 
                    color="#3b82f6"
                    height={90}
                    xLabel="Day"
                  />
                  <div className="text-xs text-right text-gray-500">Diastolic</div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">No data available</p>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Correlations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-primary-500" />
            Health Correlations
          </h2>
          
          <div className="space-y-3">
            {correlations.map((correlation, index) => (
              <CorrelationCard key={index} correlation={correlation} />
            ))}
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default TrendsPage;
