
import express from 'express'
import { createPost, deletePost, readPost } from '../controllers/postController.js'

let router = express.Router()


router.get('/',readPost);
router.post('/create',createPost);
router.delete('/delete/:id',deletePost);

export default router
