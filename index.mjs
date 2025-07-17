import express from 'express'
import { Worker } from 'worker_threads'

let app = express()




app.get('/non-blocking',(req,res) => {
  res.send("Hello World")
})
app.get('/blocking',(req,res) => {
  const worker = new Worker('./worker.mjs');
  worker.on("message",(data) => {
    res.status(200).send("completed : ",data)
  })
  worker.on("error",(err) => {
    res.status(404).send("Error : ",error)
  })
})

app.listen(3000,() => {
  console.log("http://localhost:3000")
})