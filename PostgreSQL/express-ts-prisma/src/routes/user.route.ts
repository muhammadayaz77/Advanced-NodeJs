import express from 'express'
import { createUser, deleteUser, fetchData } from '../controllers/user.controllers'

let router = express.Router()

router.get("/get",fetchData); 
router.post("/create",createUser); 
router.delete("/delete/:id",deleteUser); 

export default router