import {Client} from 'pg'
import express from 'express'

const app = express();
app.use(express.json())

const con = new Client({
  host : 'localhost',
  user : 'postgres',
  port : 5432,
  password : 'roniayaz22757',
  database : 'demopost',
})

con.connect().then(() => console.log("connected"))


app.post('/postData',(req,res) => {
  let {name,id} = req.body;
  const insert_query = 'INSERT INTO demotable (name,id) VALUES($1,$2)'
  con.query(insert_query,[name,id],(err,result) => {
    if(err){
      return res.send(err)
    }else{
      console.log(result)
      res.send('Posted Data')
    }
  })
})
app.get('/getData',(req,res) => {
  const select_query = 'SELECT * FROM demotable'
  con.query(select_query,(err,result) => {
    if(err){
      return res.send(err)
    }else{
      // console.log(result.rows)
      res.send(result.rows)
    }
  })
})
app.put('/updateDataById/:id',(req,res) => {
  let {name,id} = req.body;
  const query = `UPDATE demotable SET name=$1 WHERE id = $2`
  con.query(query,[name,id],(err,result) => {
    if(err){
      return res.send(err)
    }else{
      // console.log(result.rows)
      res.send("Updated")
    }
  })
})
app.get('/getDataById/:id',(req,res) => {
  let {id} = req.params;
  const query = `SELECT * FROM demotable WHERE id = $1`
  con.query(query,[id],(err,result) => {
    if(err){
      return res.send(err)
    }else{
      // console.log(result.rows)
      res.send(result.rows)
    }
  })
})



app.delete('/ deleteById/:id',(req,res) => {
  let {id} = req.params;
  const query = 'DELETE FROM demotable WHERE id = $1';
  con.query(query,[id],(err,result) => {
    if(err){
      res.send(err)
    }
    else{
      res.send(`Data of id : ${id} has been deleted`)
    }
  })
})

app.get('/all-data',(req,res) => {
  let query = 'SELECT * FROM demotable';
  con.query(query,(err,result) => {
    if(err){
      res.json(err)
    }else{
      res.json(result.rows)
    }
  })
})

app.listen(3000,() => {
  console.log("http://locahost:3000")
})