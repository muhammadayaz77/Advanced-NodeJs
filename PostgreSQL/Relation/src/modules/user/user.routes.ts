import express from "express";
import {createUserWithProfile, getUsersWithProfile } from "./user.controllers";
import {authenticateToken} from '../../middlewares/auth.middleware'

let router = express.Router()

router.get('/read',getUsersWithProfile)
// router.post('/register',register)
router.post('/create',createUserWithProfile)
// router.post('/login',login)
// router.post('/refresh',refresh)
// router.get('/logout',authenticateToken,logout)
// router.get('/all-user',authenticateToken,AuthUser)

export default router