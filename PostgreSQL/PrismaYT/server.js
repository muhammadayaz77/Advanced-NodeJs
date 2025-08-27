import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.mjs'

dotenv.config()
let app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());

app.use('/api/user',userRouter)
app.get('/',(req,res) => {
  return res.send('Hello Everyone');
})

app.listen(PORT,() => {
  console.log('localhost:3000')
})