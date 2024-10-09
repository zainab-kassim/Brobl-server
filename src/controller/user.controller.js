import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import generateToken from '../auth/auth.js'



export const signupUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const existingUser = await User.findOne({ username: username })
        if (existingUser) {
            return res.json({ message: "User already exists",existingUser })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username: username,
            password: hashedPassword

        })
        await newUser.save()
        const token = await generateToken(newUser)
        const Username=newUser.username
        return res.json({ message: "User created successfully",token,Username })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const signinUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const existingUser = await User.findOne({ username: username })

        if (!existingUser) {
            return res.json({ message: "invalid username" })
        }
        const PasswordMatch = await bcrypt.compare(password, existingUser.password)
        if (PasswordMatch) {
            const token = await generateToken(existingUser)
            const Username = existingUser.username
            return res.json({ message: "User signed in successfully", token, Username })
        } else {
            return res.json({ message: "invalid password" })
        }
    } catch (error) {
        console.log(error);
    }


}



