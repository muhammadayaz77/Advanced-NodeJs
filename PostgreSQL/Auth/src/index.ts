import express, {Request,Response} from 'express'

let app = express()

app.use(express.json())

app.get('/',(req : Request,res : Response) => {
  res.send("Hello")
})

app.listen(3000,() => {
  console.log('running 3000')
})