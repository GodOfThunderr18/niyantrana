# Backend Integration Testing Guide

## Overview

This guide outlines how to test the integration between the Niyantrana frontend and backend systems. The backend provides a comprehensive REST API with advanced security, validation, and monitoring features.

## Prerequisites

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   Create `.env` file in the backend directory:
   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=5000
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/niyantrana
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   JWT_REFRESH_SECRET=your-refresh-secret-here
   JWT_REFRESH_EXPIRE=30d
   
   # Email Configuration
   EMAIL_FROM=noreply@niyantrana.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   
   # API Keys
   GEMINI_API_KEY=your-gemini-api-key-here
   OPENAI_API_KEY=your-openai-api-key-here
   
   # External Services
   PINECONE_API_KEY=your-pinecone-api-key-here
   PINECONE_ENVIRONMENT=your-pinecone-environment
   ```

3. **Start MongoDB**
   Ensure MongoDB is running on your system:
   ```bash
   # Windows (if MongoDB is installed as service)
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

4. **Start Backend Server**
   ```bash
   cd backend
   npm start
   # or for development with auto-reload
   npm run dev
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   npm install axios
   ```

2. **Environment Configuration**
   Create `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_GEMINI_API_KEY=your-gemini-api-key-here
   ```

3. **Start Frontend Server**
   ```bash
   npm start
   ```

## Integration Testing Scenarios

### 1. Authentication Flow

**Test User Registration:**
1. Navigate to `/login` and click "Sign Up"
2. Fill out the registration form with valid data
3. Submit the form
4. Verify:
   - User is created in MongoDB
   - JWT token is returned
   - User is redirected to onboarding
   - Backend logs show successful registration

**Test User Login:**
1. Navigate to `/login`
2. Enter valid credentials
3. Submit the form
4. Verify:
   - JWT token is returned and stored
   - User is redirected to dashboard
   - Backend logs show successful authentication

**Test Token Refresh:**
1. Wait for token to near expiration
2. Make an API request
3. Verify:
   - Token is automatically refreshed
   - Request completes successfully

### 2. Health Data Management

**Test Vitals Logging:**
1. Navigate to `/logging`
2. Add vital signs (weight, blood pressure, heart rate)
3. Submit the data
4. Verify:
   - Data is saved to MongoDB
   - Validation rules are enforced
   - Data appears in trends/dashboard

**Test Meal Logging:**
1. Navigate to `/logging`
2. Log a meal with multiple food items
3. Submit the data
4. Verify:
   - Meal data is saved correctly
   - Nutritional calculations are performed
   - Data appears in nutrition summary

**Test Activity Logging:**
1. Navigate to `/logging`
2. Log physical activity
3. Submit the data
4. Verify:
   - Activity data is saved
   - Calorie burn calculations are correct
   - Data appears in activity summary

### 3. Risk Assessment

**Test NAFLD Risk Assessment:**
1. Navigate to dashboard and click "Assess Risk"
2. Fill out the comprehensive health questionnaire
3. Submit the assessment
4. Verify:
   - ML model processes the data
   - Risk score is calculated and displayed
   - Assessment is saved to history
   - Recommendations are generated

**Test Quick Screening:**
1. Use the quick screening feature
2. Answer basic health questions
3. Verify:
   - Quick risk assessment is performed
   - Results are displayed immediately
   - User is prompted for full assessment if needed

### 4. AI Chat Integration

**Test Wellness Coach:**
1. Navigate to `/chatbot`
2. Send various types of messages:
   - Health questions
   - Meal logging requests
   - Symptom descriptions
   - General wellness queries
3. Verify:
   - Gemini AI responds appropriately
   - Context is maintained across conversation
   - Health data integration works
   - Responses are culturally appropriate

**Test RAG System:**
1. Ask specific medical questions
2. Request personalized recommendations
3. Verify:
   - Relevant knowledge base articles are retrieved
   - Responses include accurate medical information
   - Sources are cited when appropriate

### 5. Data Trends and Analytics

**Test Trend Visualization:**
1. Navigate to `/trends`
2. View different trend charts
3. Verify:
   - Data is fetched from backend correctly
   - Charts display accurate information
   - Date filtering works properly
   - Insights are generated based on trends

**Test Correlation Analysis:**
1. Log data over several days
2. View correlation insights
3. Verify:
   - Correlations are calculated correctly
   - Meaningful insights are provided
   - Recommendations are actionable

### 6. Security and Validation

**Test Input Validation:**
1. Try submitting invalid data in various forms
2. Verify:
   - Client-side validation catches errors
   - Server-side validation provides detailed feedback
   - Malicious input is sanitized
   - SQL/NoSQL injection attempts are blocked

**Test Rate Limiting:**
1. Make rapid API requests
2. Verify:
   - Rate limits are enforced
   - Appropriate error messages are returned
   - Different endpoints have different limits

**Test File Upload Security:**
1. Try uploading various file types
2. Verify:
   - Only allowed file types are accepted
   - File size limits are enforced
   - Malicious files are rejected
   - Files are stored securely

### 7. Error Handling

**Test Network Errors:**
1. Disconnect from internet
2. Try using the application
3. Verify:
   - Appropriate error messages are displayed
   - Application gracefully handles offline state
   - Data is preserved when connection returns

**Test Server Errors:**
1. Stop the backend server
2. Try using the application
3. Verify:
   - Connection errors are handled gracefully
   - User is informed about server issues
   - Application doesn't crash

## API Endpoint Testing

### Health Check
```bash
# Test server health
curl http://localhost:5000/api/health-check

# Expected response:
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "database": "connected",
  "memory": { "used": 50, "total": 100 }
}
```

### Authentication
```bash
# Register new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "confirmPassword": "Test123!",
    "profile": {
      "firstName": "Test",
      "lastName": "User",
      "dateOfBirth": "1990-01-01",
      "gender": "male",
      "height": 175
    }
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

### Health Data
```bash
# Add vitals (requires authentication token)
curl -X POST http://localhost:5000/api/health/vitals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "type": "vitals",
    "vitals": {
      "weight": { "value": 70, "unit": "kg" },
      "bloodPressure": { "systolic": 120, "diastolic": 80 },
      "heartRate": { "value": 72 }
    }
  }'
```

### Risk Assessment
```bash
# NAFLD risk assessment
curl -X POST http://localhost:5000/api/assessment/nafld \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "age": 35,
    "gender": "male",
    "weight": 80,
    "height": 175,
    "waistCircumference": 90,
    "systolicBP": 130,
    "diastolicBP": 85,
    "fastingGlucose": 95,
    "totalCholesterol": 200,
    "hdlCholesterol": 45,
    "triglycerides": 150,
    "alt": 35,
    "ast": 30,
    "alcoholConsumption": 2,
    "smokingStatus": "never",
    "physicalActivity": 150,
    "dietQuality": 7
  }'
```

## Monitoring and Debugging

### Backend Logs
Monitor backend logs for:
- API requests and responses
- Authentication events
- Validation errors
- Security alerts
- Performance metrics
- Error tracking

Logs are stored in:
- `backend/logs/combined.log` - All logs
- `backend/logs/error.log` - Error logs only
- `backend/logs/exceptions.log` - Uncaught exceptions

### Database Monitoring
Use MongoDB Compass or CLI to monitor:
- User registrations
- Health data entries
- Risk assessments
- Chat sessions
- Error tracking data

### Performance Monitoring
Monitor:
- API response times
- Database query performance
- Memory usage
- Error rates
- Rate limiting effectiveness

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure frontend URL is in CORS whitelist
   - Check browser console for specific CORS errors

2. **Authentication Failures**
   - Verify JWT secret configuration
   - Check token expiration settings
   - Ensure proper token storage in frontend

3. **Database Connection Issues**
   - Verify MongoDB is running
   - Check connection string in .env
   - Monitor database logs

4. **API Key Issues**
   - Verify Gemini API key is valid
   - Check API key permissions
   - Monitor API usage limits

5. **Validation Errors**
   - Check request payload format
   - Verify required fields are included
   - Review validation schema requirements

### Debug Mode
Enable debug mode by setting:
```env
NODE_ENV=development
DEBUG=niyantrana:*
```

This provides detailed logging for debugging integration issues.

## Success Criteria

Integration testing is successful when:

1. ✅ All authentication flows work correctly
2. ✅ Health data can be logged and retrieved
3. ✅ Risk assessments are calculated accurately
4. ✅ AI chat provides relevant responses
5. ✅ Data trends are displayed correctly
6. ✅ Security measures are effective
7. ✅ Error handling is graceful
8. ✅ Performance is acceptable
9. ✅ All API endpoints respond correctly
10. ✅ Data persistence is reliable

## Next Steps

After successful integration testing:

1. **Performance Optimization**
   - Implement caching strategies
   - Optimize database queries
   - Add CDN for static assets

2. **Production Deployment**
   - Set up production environment
   - Configure SSL certificates
   - Implement monitoring and alerting

3. **User Acceptance Testing**
   - Conduct testing with real users
   - Gather feedback and iterate
   - Refine user experience

4. **Continuous Integration**
   - Set up automated testing pipeline
   - Implement deployment automation
   - Add performance monitoring