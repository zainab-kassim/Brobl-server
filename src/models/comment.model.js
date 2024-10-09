import mongoose from 'mongoose';
const Schema = mongoose.Schema;



const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"       
    },
    text: {
        type: String,
        reuired:true
    }

});


export const Comment = mongoose.model('Comment', commentSchema);
