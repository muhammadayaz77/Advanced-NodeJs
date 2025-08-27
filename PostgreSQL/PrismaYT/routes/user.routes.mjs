
import express from 'express'
import { createUser, readData, updateUser } from '../controllers/user.controller.js'

let router = express.Router()


router.post('/',createUser)
router.post('/update',updateUser)
router.post('/read',readData)

export default router