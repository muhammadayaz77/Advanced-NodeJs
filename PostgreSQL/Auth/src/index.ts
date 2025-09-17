import express, { Application } from 'express'
import dotenv from 'dotenv'
import userRouter from './modules/user/user.routes'
dotenv.config()
let app : Application = express()
app.use(express.json())
let PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/api/auth',userRouter)

app.listen(PORT,() => {
  console.log('running 3000')
})