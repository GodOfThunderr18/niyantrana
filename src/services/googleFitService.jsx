// Google Fit API Service for wearable device integration

class GoogleFitService {
  constructor() {
    this.isInitialized = false;
    this.accessToken = null;
    this.gapi = null;
  }

  // Initialize Google API client
  async initialize() {
    return new Promise((resolve, reject) => {
      if (this.isInitialized) {
        resolve(true);
        return;
      }

      // Load Google API script
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        window.gapi.load('auth2:client', async () => {
          try {
            await window.gapi.client.init({
              apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
              clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
              discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest'],
              scope: [
                'https://www.googleapis.com/auth/fitness.activity.read',
                'https://www.googleapis.com/auth/fitness.body.read',
                'https://www.googleapis.com/auth/fitness.heart_rate.read',
                'https://www.googleapis.com/auth/fitness.sleep.read'
              ].join(' ')
            });
            
            this.gapi = window.gapi;
            this.isInitialized = true;
            resolve(true);
          } catch (error) {
            reject(error);
          }
        });
      };
      script.onerror = () => reject(new Error('Failed to load Google API'));
      document.head.appendChild(script);
    });
  }

  // Authenticate user and get permissions
  async authenticate() {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const authInstance = this.gapi.auth2.getAuthInstance();
      const user = await authInstance.signIn();
      
      if (user.isSignedIn()) {
        this.accessToken = user.getAuthResponse().access_token;
        return {
          success: true,
          user: {
            id: user.getId(),
            name: user.getBasicProfile().getName(),
            email: user.getBasicProfile().getEmail()
          }
        };
      }
      
      throw new Error('Authentication failed');
    } catch (error) {
      console.error('Google Fit authentication error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Check if user is already authenticated
  isAuthenticated() {
    if (!this.isInitialized || !this.gapi) return false;
    
    const authInstance = this.gapi.auth2.getAuthInstance();
    return authInstance && authInstance.isSignedIn.get();
  }

  // Get fitness data for a specific date range
  async getFitnessData(startDate, endDate) {
    try {
      if (!this.isAuthenticated()) {
        throw new Error('User not authenticated');
      }

      const startTimeMillis = new Date(startDate).getTime();
      const endTimeMillis = new Date(endDate).getTime();

      // Get steps data
      const stepsResponse = await this.gapi.client.fitness.users.dataSources.dataPointChanges.list({
        userId: 'me',
        dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
        startTime: startTimeMillis + '000000',
        endTime: endTimeMillis + '000000'
      });

      // Get heart rate data
      const heartRateResponse = await this.gapi.client.fitness.users.dataSources.dataPointChanges.list({
        userId: 'me',
        dataSourceId: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm',
        startTime: startTimeMillis + '000000',
        endTime: endTimeMillis + '000000'
      });

      // Get activity data
      const activityResponse = await this.gapi.client.fitness.users.sessions.list({
        userId: 'me',
        startTime: new Date(startDate).toISOString(),
        endTime: new Date(endDate).toISOString()
      });

      return {
        success: true,
        data: {
          steps: this.parseStepsData(stepsResponse.result),
          heartRate: this.parseHeartRateData(heartRateResponse.result),
          activities: this.parseActivityData(activityResponse.result)
        }
      };
    } catch (error) {
      console.error('Error fetching fitness data:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Parse steps data from Google Fit response
  parseStepsData(response) {
    if (!response.insertedDataPoint) return [];
    
    return response.insertedDataPoint.map(point => ({
      timestamp: new Date(parseInt(point.startTimeNanos) / 1000000),
      steps: point.value[0].intVal || 0
    }));
  }

  // Parse heart rate data from Google Fit response
  parseHeartRateData(response) {
    if (!response.insertedDataPoint) return [];
    
    return response.insertedDataPoint.map(point => ({
      timestamp: new Date(parseInt(point.startTimeNanos) / 1000000),
      heartRate: point.value[0].fpVal || 0
    }));
  }

  // Parse activity data from Google Fit response
  parseActivityData(response) {
    if (!response.session) return [];
    
    return response.session.map(session => ({
      id: session.id,
      name: session.name,
      activityType: session.activityType,
      startTime: new Date(session.startTimeMillis),
      endTime: new Date(session.endTimeMillis),
      duration: session.endTimeMillis - session.startTimeMillis
    }));
  }

  // Disconnect from Google Fit
  async disconnect() {
    try {
      if (this.isAuthenticated()) {
        const authInstance = this.gapi.auth2.getAuthInstance();
        await authInstance.signOut();
      }
      this.accessToken = null;
      return { success: true };
    } catch (error) {
      console.error('Error disconnecting from Google Fit:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get today's summary data
  async getTodaysSummary() {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
    return await this.getFitnessData(startOfDay, endOfDay);
  }
}

// Export singleton instance
export default new GoogleFitService();