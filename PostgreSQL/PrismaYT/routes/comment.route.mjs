
import express from 'express'
import { createComment, readComment } from '../controllers/commentController.js';

let router = express.Router()


router.get('/',readComment);
router.post('/create',createComment);

export default router
