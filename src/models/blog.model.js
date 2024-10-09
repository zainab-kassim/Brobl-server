import mongoose from 'mongoose';
const Schema = mongoose.Schema;



const blogSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required:[true, 'author is required']
  },
  text: {
    type: String,
    required: [true, 'text is required']
  },
  img: {
    type: String,
    required: [true, 'Image URL is required']
  }
  ,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes:[{
    type: String,
    ref: 'User'
  }]

});


export const Blog = mongoose.model('Blog', blogSchema);

