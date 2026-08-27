// Use the local API while developing with Live Server, and the same deployed
// Vercel domain in production. Keeping this relative in production avoids CORS
// and means no URL needs to be changed after each deployment.
const apiBaseUrl = ['localhost', '127.0.0.1'].includes(window.location.hostname)
  ? 'http://localhost:5000/api'
  : '/api';

window.FOODIE_API_CONFIG = {
  endpoints: {
    auth: {
      register: `${apiBaseUrl}/auth/register`,
      login: `${apiBaseUrl}/auth/login`,
    },
    orders: `${apiBaseUrl}/orders`,
  },
};
