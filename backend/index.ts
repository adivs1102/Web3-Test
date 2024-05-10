import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import TodoModel from './Models/Todo'

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://aditya:adirox123@cluster0.v7fbpph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.post('/add',(req,res)=>{
    const task=req.body.task;
    TodoModel.create({
        task:task
    }).then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.put('/update/:id',(req,res)=>{
    const {id}=req.params;
    TodoModel.findByIdAndUpdate({_id:id},{done:true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.delete('/delete/:id',(req,res)=>{
    const {id}=req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})
const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})