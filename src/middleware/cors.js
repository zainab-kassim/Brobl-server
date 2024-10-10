import cors from 'cors'
// CORS setup
const corsMiddleware = cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://brobl-client.vercel.app'
    : 'http://localhost:3000', // Replace with your client's origin if needed
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  optionsSuccessStatus: 200, // For legacy browsers
});


export default corsMiddleware;