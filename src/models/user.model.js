import mongoose from 'mongoose';
const Schema = mongoose.Schema;



const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});


export const User = mongoose.model('User', userSchema);
