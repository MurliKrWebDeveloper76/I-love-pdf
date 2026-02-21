const isProduction = import.meta.env.PROD;
export const API_URL = isProduction 
  ? 'https://i-love-pdf-72kf.onrender.com' 
  : 'https://i-love-pdf-72kf.onrender.com'; // Use Render backend for dev too if desired, or keep localhost

// If you want to use localhost for development, uncomment the line below and comment out the one above
// export const API_URL = isProduction ? 'https://i-love-pdf-72kf.onrender.com' : '';
