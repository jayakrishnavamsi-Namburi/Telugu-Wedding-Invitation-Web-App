// Backend API Configuration
// Deployed API URL on Render
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://telugu-wedding-backend.onrender.com';

export const API_ENDPOINTS = {
  GUESTS: `${API_BASE_URL}/api/guests`,
  STATS: `${API_BASE_URL}/api/guests/stats`,
  HEALTH: `${API_BASE_URL}/api/health`,
};
