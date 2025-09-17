import express from "express";
import { getAllUser, login, register } from "./user.controllers";

let router = express.Router()

router.get('/all-user',getAllUser)
router.post('/register',register)
router.post('/login',login)

export default router