import express from "express";
import {create, deleteTodo, readAllTodos, updateTodo } from "./todo.controllers";
import {authenticateToken} from '../../middlewares/auth.middleware'

let router = express.Router()

router.post('/create',authenticateToken,create)
router.get('/read',authenticateToken,readAllTodos)
router.delete('/delete/:id',authenticateToken,deleteTodo)
router.put('/update/:id',authenticateToken,updateTodo)

export default router;