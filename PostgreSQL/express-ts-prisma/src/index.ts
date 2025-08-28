import express, { NextFunction, Request, Response } from 'express'
import userRoutes from './routes/user.route'
// import { Application } from 'express';

const app = express()
app.use(express.json())
app.use(express.urlencoded())
const PORT = 3000;

app.use("/api/user",userRoutes)

app.listen(PORT,() => {
  console.log("running")
})

