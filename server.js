//express
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/mern-app')
.then(()=>{
    console.log("db connected");
})
.catch((err)=>{
    console.log(err)
})
const todoschema = new mongoose.Schema({
    title: String,
    description:String
})

const todomodel = mongoose.model('todo',todoschema)

app.post('/todos',async(req,res)=>{
    const {title,description}=req.body;


    try{
   const newtodo =  new todomodel({title,description});
   await newtodo.save();
   res.send(200).json(newtodo);
    } catch(error){
       console.log(error)
       res.status(200).json({message:error.message})
    }



})

app.get('/todos',(req,res) =>{
    res.json(todos);
})



const port = 8000;

app.listen(port,()=>{
    console.log('hi i am coming');
})