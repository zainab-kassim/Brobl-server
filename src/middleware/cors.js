import cors from 'cors'
// CORS setup
const corsMiddleware = cors({
  origin: 'https://brobl-client.vercel.app', // Replace with your client's origin if needed
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  optionsSuccessStatus: 200, // For legacy browsers
});


export default corsMiddleware;