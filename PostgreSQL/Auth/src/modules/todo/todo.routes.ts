import express from "express";
import {AuthUser,login, logout, refresh, register } from "./todo.controllers";
import {authenticateToken} from '../../middlewares/auth.middleware'

let router = express.Router()

// router.get('/all-user',getAllUser)
router.post('/register',register)
router.post('/login',login)
router.post('/refresh',refresh)
router.get('/logout',authenticateToken,logout)
router.get('/all-user',authenticateToken,AuthUser)

export default router