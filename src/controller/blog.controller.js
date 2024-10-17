import { Blog } from '../models/blog.model.js';
import { Comment } from '../models/comment.model.js';
import { User } from '../models/user.model.js';



export const createBlog = async (req, res) => {
    try {
        const { text, img } = req.body
        const blog = new Blog({
            author: req.user._id,
            text: text,
            img: img
        })
        const newBlog = await blog.save().populate('author')
        return res.json({ message: "Blog posted successfully", newBlog })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const showUserBlog = async (req, res) => {
    try {
        const { username } = req.params
        const foundUser = await User.findOne({ username: username });
        const foundUserBlogs = await Blog.find({ author: foundUser._id }).populate('author');
        return res.json({ message: "profile found", foundUserBlogs })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}



export const showAllBlogs = async (req, res) => {
    try {

        const foundBlogs = await Blog.find().populate('author');

        return res.json({ message: "blogs found", foundBlogs })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const showBlog = async (req, res) => {
    try {

        const { blogId } = req.params
        const foundBlog = await Blog.findById(blogId).populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        }).populate('author')
        return res.json({ message: "blog found", foundBlog })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const editBlog = async (req, res) => {
    try {
        const { blogId } = req.params
        const { text, img } = req.body
        const userBlog = await Blog.findById(blogId)
        if (userBlog.author.equals(req.user._id)) {
            const updatedBlog = await Blog.findByIdAndUpdate({ _id: blogId }, { text: text, img: img }).populate('author')
            return (
                res.json({ message: 'Blog updated successfully', updatedBlog })
            )
        } else {
            res.json({ message: 'unauthorized' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }

}



export const deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params
        const userBlog = await Blog.findById(blogId)
        if (userBlog.author.equals(req.user._id)) {
            const deletedBlog = await Blog.findByIdAndDelete(blogId)
            return (
                res.json({ message: 'Blog deleted successfully' })
            )
        } else {
            res.json({ message: 'unauthorized' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const createComment = async (req, res) => {
    try {

        const { blogId } = req.params; // Blog ID
        const { text } = req.body; // Comment text
        const userId = req.user._id; // Assuming user is logged in


        // Create and save the comment in the Comment schema
        const comment = new Comment({
            author: userId,
            text: text
        });
        const savedComment = await comment.save();

        // Find the blog by ID
        const blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Add the comment text to the blog's comments array
        blog.comments.push(savedComment)



        // Save the updated blog
        await blog.save();


        const populatedBlog = await Blog.findById(blogId).populate('comments')



        return res.json({ message: "Comment added successfully", populatedBlog });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { commentId, blogId } = req.params; // comment ID
        const userId = req.user._id; // Assuming user is logged in

        const userComment = await Comment.findById(commentId)

        if (userComment.author.equals(userId)) {

            await Blog.findByIdAndUpdate(blogId, { $pull: { comments: commentId } });

            await Comment.findByIdAndDelete(commentId)

            return res.json({ message: "comment deleted successfully" })
        } else {
            res.json({ message: 'unauthorized' })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}