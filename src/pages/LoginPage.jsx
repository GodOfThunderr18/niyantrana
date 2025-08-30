import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with natural abstract pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-green-100">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-40 right-40 w-48 h-48 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow" style={{ animationDelay: '5s' }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center responsive-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md"
        >
          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <motion.div 
              className="flex justify-center mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src="/logo.svg" alt="Niyantrana Logo" className="h-16 w-auto drop-shadow-xl" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gradient bg-gradient-to-r from-primary-600 to-secondary-500">Niyantrana</h1>
            <p className="text-gray-700 mt-2 backdrop-blur-sm bg-white/10 inline-block px-3 py-1 rounded-full shadow-sm">Your Personalized Metabolic Wellness Companion</p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="glassmorphism-login p-8"
          >
            <h2 className="responsive-heading text-gray-800 mb-4 sm:mb-6 text-center">
              Welcome Back
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/40 backdrop-blur-md shadow-inner"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-white/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/40 backdrop-blur-md shadow-inner"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary-600 hover:text-primary-700 transition-colors hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl backdrop-blur-sm bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-white/30 rounded-xl hover:bg-white/60 transition-all duration-300 bg-white/40 backdrop-blur-md shadow-md hover:shadow-lg"
              >
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"/>
                  <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"/>
                  <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"/>
                  <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"/>
                </svg>
                <span className="text-gray-700 font-medium">Continue with Google</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-white/30 rounded-xl hover:bg-white/60 transition-all duration-300 bg-white/40 backdrop-blur-md shadow-md hover:shadow-lg"
              >
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.5977 2.26027C13.2904 1.48059 14.3867 0.881468 15.4416 0.881468C15.5183 0.881468 15.5908 0.886578 15.6621 0.89465C15.6697 0.978259 15.6748 1.06289 15.6748 1.14946C15.6748 2.2043 15.1602 3.27886 14.3936 3.96562C13.6424 4.67895 12.6143 5.32332 11.5313 5.23379C11.5084 5.15129 11.4957 5.06574 11.4957 4.97918C11.4957 3.96664 12.0361 2.90039 12.5977 2.26027ZM19.2285 17.9981C19.2285 18.0107 19.2295 18.0233 19.2295 18.0359C19.2295 18.9579 18.9482 19.8809 18.3936 20.6483C17.8682 21.3706 17.1221 22.0446 16.1123 22.0446C15.2275 22.0446 14.6152 21.5908 13.8223 21.2329C13.0674 20.8934 12.2754 20.5385 11.1533 20.5385C9.97852 20.5385 9.14551 20.9038 8.35352 21.2532C7.59863 21.5846 6.88379 21.9038 6.09082 21.9038C5.18066 21.9038 4.44336 21.2847 3.8877 20.5487C3.24609 19.6911 2.77051 18.4298 2.77051 17.2153C2.77051 15.1101 3.72559 13.4058 4.97852 12.4461C5.97559 11.6848 7.19824 11.2686 8.37402 11.2686C9.19922 11.2686 9.8623 11.5908 10.4824 11.8898C11.0254 12.1511 11.5264 12.3945 12.1533 12.3945C12.7041 12.3945 13.1484 12.1674 13.6553 11.9161C14.3223 11.5908 15.0967 11.2134 16.0967 11.2134C16.9629 11.2134 18.0967 11.4622 19.0264 12.3137C18.1748 13.4724 17.7432 14.4939 17.7432 16.0487C17.7432 16.7329 17.9404 17.4069 18.3164 17.9981H19.2285Z" fill="black"/>
                </svg>
                <span className="text-gray-700 font-medium">Continue with Apple</span>
              </motion.button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <motion.span whileHover={{ scale: 1.05 }} display="inline-block">
                <Link
                  to="/signup"
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors hover:underline"
                >
                  Sign Up
                </Link>
              </motion.span>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center text-gray-500 text-sm mt-6"
          >
            Empowering your journey to better metabolic health
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
