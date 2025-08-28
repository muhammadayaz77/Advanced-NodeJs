import express, { NextFunction, Request, Response } from 'express'
// import { Application } from 'express';

const app = express()

const PORT = 3000;

app.get('/api/user',(req:Request,res : Response,next : NextFunction) => {
  
})

app.listen(PORT,() => {
  console.log("running")
})