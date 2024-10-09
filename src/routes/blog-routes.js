import express from 'express';
import isLoggedIn from '../utils/isLoggedIn.js'
import handleAsyncErr from '../utils/catchError.js'
import { createBlog , createComment,  deleteBlog, deleteComment, editBlog, showAllBlogs, showBlog, showUserBlog, } from '../controller/blog.controller.js';
import { toggleLike } from '../controller/likes.controller.js';

const router = express.Router()


router.post('/create', isLoggedIn, handleAsyncErr(createBlog))

router.get('/show', (showAllBlogs))

router.get('/:blogId', (showBlog))

router.get('/userProfile/:username',(showUserBlog))

router.put('/:blogId/update', isLoggedIn, handleAsyncErr(editBlog))

router.post('/:blogId/like', isLoggedIn, handleAsyncErr(toggleLike))

router.delete('/:blogId/delete', isLoggedIn, handleAsyncErr(deleteBlog))

router.post('/:blogId/comment/create', isLoggedIn, handleAsyncErr(createComment))

router.delete('/:blogId/comment/:commentId/delete', isLoggedIn, handleAsyncErr(deleteComment))




export default router;