import express from 'express'
import { Worker } from 'worker_threads'

let app = express()
let THREADS_COUNT = 4;

function createWorker() {
  return new Promise((resolve,reject) => {
    const worker = new Worker('./four-worker.mjs',{
      workerData : {thread_count : THREADS_COUNT}
    });
    worker.on("message",(data) => {
      resolve("completed : ",data)
    })
    worker.on("error",(err) => {
      reject(404).send("Error : ",err)
    })
  })
}

app.get('/non-blocking',(req,res) => {
  res.send("Hello World")
})
app.get('/blocking',(req,res) => {
  const workerPromises = [];
  for(let i = 0;i<THREADS_COUNT;i++){
    workerPromises.push(createWorker())
  }
  const thread_results = new Promise.all(workerPromises);
   const total = 
   thread_results[0] + 
   thread_results[1] + 
   thread_results[2] + 
   thread_results[3];
   res.status(200).send('result : ',total)
})

app.listen(3000,() => {
  console.log("http://localhost:3000")
})