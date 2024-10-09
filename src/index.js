import express from 'express'
import passport from 'passport'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import blogRoutes from './routes/blog-routes.js'
import userRoutes from './routes/user-routes.js'
import corsMiddleware from './middleware/cors.js'


if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}



const app = express();
app.use(passport.initialize());
app.use(corsMiddleware);

// To parse form data in POST request body
app.use(express.urlencoded({ extended: true,limit: '10mb'  }));



// To parse incoming JSON in POST request body
app.use(express.json());

//Route for userLogic
app.use('/api/user',userRoutes)

//Route for taskLogic
app.use('/api/blog',blogRoutes)



// Start your server
const PORT = process.env.PORT || 4000;
const VERCEL_URL = process.env.VERCEL_URL || `http://localhost:${PORT}`;
app.listen(PORT, () => {
  // Call the connectDB function to establish the connection
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
