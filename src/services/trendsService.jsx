// Trends and Insights Service
import { getMealLogs, getVitalLogs, getActivityLogs } from './loggingService.jsx';

// Helper function to group data by date
const groupByDate = (logs) => {
  const grouped = {};
  
  logs.forEach(log => {
    const date = new Date(log.timestamp).toLocaleDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(log);
  });
  
  return grouped;
};

// Get calorie intake trend data
export const getCalorieIntakeTrend = (days = 7) => {
  const mealLogs = getMealLogs();
  const grouped = groupByDate(mealLogs);
  
  // Generate dates for the last 'days' days
  const dates = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.unshift(date.toLocaleDateString());
  }
  
  // Map dates to calorie totals
  return dates.map(date => {
    const dayLogs = grouped[date] || [];
    const calories = dayLogs.reduce((total, log) => {
      return total + (log.totalCalories || 0);
    }, 0);
    
    return {
      date,
      calories
    };
  });
};

// Get activity trend data
export const getActivityTrend = (days = 7) => {
  const activityLogs = getActivityLogs();
  const grouped = groupByDate(activityLogs);
  
  // Generate dates for the last 'days' days
  const dates = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.unshift(date.toLocaleDateString());
  }
  
  // Map dates to activity data
  return dates.map(date => {
    const dayLogs = grouped[date] || [];
    const caloriesBurned = dayLogs.reduce((total, log) => {
      return total + (log.caloriesBurned || 0);
    }, 0);
    
    const durationMinutes = dayLogs.reduce((total, log) => {
      return total + (log.durationMinutes || 0);
    }, 0);
    
    return {
      date,
      caloriesBurned,
      durationMinutes
    };
  });
};

// Get vitals trend data
export const getVitalsTrend = (days = 7) => {
  const vitalLogs = getVitalLogs();
  const grouped = groupByDate(vitalLogs);
  
  // Generate dates for the last 'days' days
  const dates = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.unshift(date.toLocaleDateString());
  }
  
  // Map dates to vitals data
  return dates.map(date => {
    const dayLogs = grouped[date] || [];
    
    // If multiple readings in a day, use the latest one
    const latestLog = dayLogs[0] || {};
    
    return {
      date,
      systolic: latestLog.systolic || null,
      diastolic: latestLog.diastolic || null,
      glucose: latestLog.glucose || null,
      weight: latestLog.weight || null
    };
  });
};

// Calculate net calorie balance
export const getCalorieBalance = (days = 7) => {
  const intakeTrend = getCalorieIntakeTrend(days);
  const activityTrend = getActivityTrend(days);
  
  return intakeTrend.map((item, index) => {
    const activityItem = activityTrend[index];
    
    return {
      date: item.date,
      intake: item.calories,
      burned: activityItem.caloriesBurned,
      net: item.calories - activityItem.caloriesBurned
    };
  });
};

// Generate insights based on the data
export const generateInsights = () => {
  const insights = [];
  const calorieBalance = getCalorieBalance(7);
  const vitalsTrend = getVitalsTrend(7);
  
  // Check calorie balance trend
  const netCalories = calorieBalance.reduce((total, day) => total + day.net, 0);
  if (netCalories > 3500) {
    insights.push({
      type: 'warning',
      title: 'Calorie Surplus',
      description: 'You have consumed more calories than you burned this week. Consider increasing your activity level.'
    });
  } else if (netCalories < -3500) {
    insights.push({
      type: 'warning',
      title: 'Calorie Deficit',
      description: 'You have a significant calorie deficit this week. Ensure you are getting adequate nutrition.'
    });
  }
  
  // Check blood pressure trend
  const hasHighBP = vitalsTrend.some(day => day.systolic > 140 || day.diastolic > 90);
  if (hasHighBP) {
    insights.push({
      type: 'alert',
      title: 'Elevated Blood Pressure',
      description: 'Your blood pressure readings have been elevated. Consider consulting with a healthcare provider.'
    });
  }
  
  // Check glucose trend
  const hasHighGlucose = vitalsTrend.some(day => day.glucose > 140);
  if (hasHighGlucose) {
    insights.push({
      type: 'alert',
      title: 'Elevated Glucose',
      description: 'Your glucose readings have been elevated. Monitor your carbohydrate intake and consider consulting with a healthcare provider.'
    });
  }
  
  // Check activity consistency
  const activityTrend = getActivityTrend(7);
  const activeDays = activityTrend.filter(day => day.durationMinutes > 0).length;
  if (activeDays < 3) {
    insights.push({
      type: 'suggestion',
      title: 'Increase Activity',
      description: 'You have been active on less than 3 days this week. Try to incorporate more physical activity into your routine.'
    });
  } else if (activeDays >= 5) {
    insights.push({
      type: 'positive',
      title: 'Consistent Activity',
      description: 'Great job staying active on 5 or more days this week!'
    });
  }
  
  // Add a general insight if there are no specific insights
  if (insights.length === 0) {
    insights.push({
      type: 'info',
      title: 'Keep Logging',
      description: 'Continue logging your meals, activities, and vitals to receive personalized insights.'
    });
  }
  
  return insights;
};

// Calculate risk trajectory based on vitals and activity
export const calculateRiskTrajectory = () => {
  const vitalsTrend = getVitalsTrend(30); // Get a month's worth of data
  const activityTrend = getActivityTrend(30);
  
  // Calculate average values
  let systolicSum = 0;
  let diastolicSum = 0;
  let systolicCount = 0;
  let diastolicCount = 0;
  
  vitalsTrend.forEach(day => {
    if (day.systolic) {
      systolicSum += day.systolic;
      systolicCount++;
    }
    if (day.diastolic) {
      diastolicSum += day.diastolic;
      diastolicCount++;
    }
  });
  
  const avgSystolic = systolicCount > 0 ? systolicSum / systolicCount : null;
  const avgDiastolic = diastolicCount > 0 ? diastolicSum / diastolicCount : null;
  
  // Calculate average activity minutes per day
  const totalActivityMinutes = activityTrend.reduce((total, day) => total + day.durationMinutes, 0);
  const avgActivityMinutes = totalActivityMinutes / 30;
  
  // Calculate risk score (simplified version)
  let riskScore = 50; // Start at medium risk
  
  // Adjust based on blood pressure
  if (avgSystolic && avgDiastolic) {
    if (avgSystolic > 140 || avgDiastolic > 90) {
      riskScore += 20; // High BP increases risk
    } else if (avgSystolic < 120 && avgDiastolic < 80) {
      riskScore -= 10; // Normal BP decreases risk
    }
  }
  
  // Adjust based on activity level
  if (avgActivityMinutes >= 30) {
    riskScore -= 15; // Regular activity decreases risk
  } else if (avgActivityMinutes < 15) {
    riskScore += 10; // Low activity increases risk
  }
  
  // Ensure risk score is between 0 and 100
  riskScore = Math.max(0, Math.min(100, riskScore));
  
  // Determine risk category
  let riskCategory;
  if (riskScore < 30) {
    riskCategory = 'Low';
  } else if (riskScore < 70) {
    riskCategory = 'Moderate';
  } else {
    riskCategory = 'High';
  }
  
  return {
    score: riskScore,
    category: riskCategory,
    trend: riskScore > 60 ? 'Increasing' : riskScore < 40 ? 'Decreasing' : 'Stable'
  };
};

// Get correlation between different metrics
export const getCorrelations = () => {
  // This is a simplified version - in a real app, you'd use more sophisticated statistical methods
  const correlations = [];
  
  // Check if there's a correlation between activity and blood pressure
  const vitalsTrend = getVitalsTrend(30);
  const activityTrend = getActivityTrend(30);
  
  // Pair up data points where we have both activity and BP data
  const pairedData = [];
  for (let i = 0; i < vitalsTrend.length; i++) {
    if (vitalsTrend[i].systolic && activityTrend[i].durationMinutes > 0) {
      pairedData.push({
        systolic: vitalsTrend[i].systolic,
        diastolic: vitalsTrend[i].diastolic,
        activityMinutes: activityTrend[i].durationMinutes
      });
    }
  }
  
  // If we have enough data points, check for correlation
  if (pairedData.length >= 5) {
    // Simple check: do days with more activity tend to have lower BP?
    let lowerBPWithMoreActivity = 0;
    
    for (let i = 0; i < pairedData.length - 1; i++) {
      for (let j = i + 1; j < pairedData.length; j++) {
        if (pairedData[i].activityMinutes > pairedData[j].activityMinutes &&
            pairedData[i].systolic < pairedData[j].systolic) {
          lowerBPWithMoreActivity++;
        } else if (pairedData[i].activityMinutes < pairedData[j].activityMinutes &&
                  pairedData[i].systolic > pairedData[j].systolic) {
          lowerBPWithMoreActivity++;
        }
      }
    }
    
    const totalComparisons = (pairedData.length * (pairedData.length - 1)) / 2;
    const correlationStrength = lowerBPWithMoreActivity / totalComparisons;
    
    if (correlationStrength > 0.6) {
      correlations.push({
        title: 'Activity and Blood Pressure',
        description: 'Your data suggests that increased physical activity is associated with lower blood pressure readings.',
        strength: 'Strong'
      });
    } else if (correlationStrength > 0.4) {
      correlations.push({
        title: 'Activity and Blood Pressure',
        description: 'Your data suggests a moderate association between physical activity and blood pressure.',
        strength: 'Moderate'
      });
    }
  }
  
  // Add a default correlation if none found
  if (correlations.length === 0) {
    correlations.push({
      title: 'Insufficient Data',
      description: 'Continue logging your health data to discover meaningful correlations.',
      strength: 'Unknown'
    });
  }
  
  return correlations;
};