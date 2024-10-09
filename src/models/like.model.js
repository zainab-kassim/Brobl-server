import mongoose from 'mongoose';
const Schema = mongoose.Schema;



const likesSchema = new Schema({
    author: [{
        type: Schema.Types.ObjectId,
        ref: "User"       
    }]

});


export const Likes = mongoose.model('Likes', likesSchema);
