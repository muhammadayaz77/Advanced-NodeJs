import cookieParser from 'cookie-parser';
import express, { Application } from 'express'
import dotenv from 'dotenv'
import userRouter from './modules/user/user.routes'
import todoRouter from './modules/todo/todo.routes'
dotenv.config()
let app : Application = express()
app.use(express.json())
app.use(cookieParser());
let PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/api/auth',userRouter)
app.use('/api/todo',todoRouter)

app.listen(PORT,() => {
  console.log('running 3000')
})