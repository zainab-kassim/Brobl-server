import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";

export const toggleLike = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from the request
    const blogId = req.params.blogId; // Assuming the blog post ID is in the URL parameters

    // Find the user by their ID to get the username
    const user = await User.findById(userId);
    

    if (!user) {
      return res.status(404).json({ message: 'Sign up to continue' });
    }

    // Find the blog post by its ID
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Check if the username already exists in the likes array
    const isLiked = blog.likes.includes(user.username);

    if (isLiked) {
      // If liked, remove the username from the likes array (unlike functionality)
      blog.likes = blog.likes.filter(username => username !== user.username);
      await blog.save(); // Save the updated blog
      return res.status(200).json({ message: 'Unliked successfully' }); // Change status code to 200 for success
    } else {
      // If not liked, add the username to the likes array (like functionality)
      blog.likes.push(user.username);
      await blog.save(); // Save the updated blog
      return res.status(200).json({ message: 'Liked successfully' }); // Change status code to 200 for success
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

