import express from 'express';
import { signinUser, signupUser} from '../controller/user.controller.js';

const router = express.Router()

//route for sign-up
router.post('/signup', signupUser)


//route for signing in
router.post('/signin', signinUser )



export default router;




