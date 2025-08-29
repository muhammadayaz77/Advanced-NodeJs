import express,{Application, Request, Response} from 'express'

let app:Application = express()

app.use(express.json())


app.get('/',(req:Request,res:Response) => {
  res.send("Home Page")
})

app.listen(3000,() => {
  console.log('server is running')
})