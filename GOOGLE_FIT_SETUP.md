# Google Fit API Integration Setup Guide

This guide explains how to set up Google Fit API integration for wearable device synchronization in the Niyantrana health tracking application.

## Overview

The Google Fit integration allows users to:
- Connect their smartwatches and fitness trackers
- Automatically sync health data (steps, heart rate, activities, sleep)
- View real-time fitness metrics on the dashboard
- Get personalized health insights based on wearable data

## Prerequisites

1. Google Cloud Console account
2. A project with Google Fit API enabled
3. OAuth 2.0 credentials configured

## Setup Instructions

### 1. Google Cloud Console Setup

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Note your project ID

2. **Enable Google Fit API**
   - Navigate to "APIs & Services" > "Library"
   - Search for "Fitness API"
   - Click "Enable"

3. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - Your production domain (for production)
   - Add authorized redirect URIs:
     - `http://localhost:3000` (for development)
     - Your production domain (for production)
   - Save the Client ID

4. **Get API Key**
   - In "Credentials", click "Create Credentials" > "API key"
   - Restrict the key to "Fitness API" for security
   - Copy the API key

### 2. Environment Configuration

Update your `.env` file with the credentials:

```env
# Google Fit API Configuration
REACT_APP_GOOGLE_API_KEY=your_actual_api_key_here
REACT_APP_GOOGLE_CLIENT_ID=your_actual_client_id_here
```

**Important**: Replace the placeholder values with your actual credentials from Google Cloud Console.

### 3. OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: "Niyantrana Health Tracker"
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes:
   - `https://www.googleapis.com/auth/fitness.activity.read`
   - `https://www.googleapis.com/auth/fitness.body.read`
   - `https://www.googleapis.com/auth/fitness.heart_rate.read`
   - `https://www.googleapis.com/auth/fitness.sleep.read`
5. Add test users (for development)

## Features Implemented

### 1. Onboarding Integration
- After completing the 8-step onboarding process
- Users are prompted to connect their wearable device
- Google Fit authentication flow
- Connection status saved to localStorage

### 2. Dashboard Widget
- Real-time fitness data display
- Metrics: Steps, Heart Rate, Active Time, Sleep Score
- Refresh functionality
- Connect/Disconnect options

### 3. Data Synchronization
- Automatic data fetching from Google Fit
- Today's summary data
- Historical data support
- Error handling and reconnection

## File Structure

```
src/
├── services/
│   └── googleFitService.js     # Google Fit API integration
├── components/
│   └── GoogleFitWidget.jsx     # Dashboard widget
├── pages/
│   ├── OnboardingPage.jsx      # Updated with Google Fit connection
│   └── DashboardPage.jsx       # Updated with widget integration
└── .env                        # Environment variables
```

## API Permissions

The integration requests the following permissions:
- **Activity Data**: Steps, distance, calories
- **Body Data**: Weight, height, body fat percentage
- **Heart Rate**: Real-time and historical heart rate data
- **Sleep Data**: Sleep duration and quality metrics

## Security Considerations

1. **API Key Restriction**: Restrict your API key to specific APIs and domains
2. **OAuth Scopes**: Only request necessary permissions
3. **Token Storage**: Access tokens are managed by Google's client library
4. **HTTPS**: Use HTTPS in production for secure data transmission

## Testing

### Development Testing
1. Ensure your `.env` file has valid credentials
2. Start the development server: `npm start`
3. Complete the onboarding process
4. Test the Google Fit connection flow
5. Verify data appears on the dashboard

### Production Testing
1. Update OAuth credentials with production domain
2. Test with real user accounts
3. Verify data synchronization
4. Test error handling scenarios

## Troubleshooting

### Common Issues

1. **"Invalid Client ID" Error**
   - Verify the client ID in `.env` matches Google Cloud Console
   - Check authorized JavaScript origins

2. **"Access Denied" Error**
   - Ensure OAuth consent screen is configured
   - Add test users for development
   - Verify API scopes are correct

3. **"API Key Invalid" Error**
   - Check API key in `.env`
   - Verify API key restrictions
   - Ensure Fitness API is enabled

4. **No Data Displayed**
   - Check browser console for errors
   - Verify user has fitness data in Google Fit
   - Test with a different Google account

### Debug Mode

Enable debug logging by setting:
```env
REACT_APP_DEBUG=true
REACT_APP_LOG_LEVEL=debug
```

## Data Privacy

- User data is fetched directly from Google Fit
- No health data is stored on our servers
- Users can disconnect at any time
- Data access follows Google's privacy policies

## Future Enhancements

1. **Additional Metrics**: Sleep quality, stress levels, VO2 max
2. **Historical Charts**: Weekly/monthly trend visualization
3. **Goal Setting**: Integration with fitness goals
4. **Multiple Devices**: Support for multiple wearable devices
5. **Offline Support**: Cache data for offline viewing

## Support

For issues with Google Fit integration:
1. Check this documentation
2. Review Google Fit API documentation
3. Check browser console for errors
4. Verify Google Cloud Console configuration

## Resources

- [Google Fit API Documentation](https://developers.google.com/fit)
- [Google Cloud Console](https://console.cloud.google.com/)
- [OAuth 2.0 Setup Guide](https://developers.google.com/identity/protocols/oauth2)
- [Google Fit REST API Reference](https://developers.google.com/fit/rest)