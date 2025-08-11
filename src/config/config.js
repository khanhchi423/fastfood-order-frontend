// src/config/config.js
const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://0nxpvdebt3.execute-api.ap-southeast-1.amazonaws.com/prod',

  // Development mode - set to true to use mock data instead of API
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true' || false,

  // Other configurations
  APP_NAME: 'FastFood Order System',
  APP_VERSION: '1.0.0',

  // Request timeout (in milliseconds)
  REQUEST_TIMEOUT: 10000,

  // Auto-refresh intervals (in milliseconds)
  ORDER_REFRESH_INTERVAL: 30000, // 30 seconds
  MENU_REFRESH_INTERVAL: 300000, // 5 minutes
};

export default config;
