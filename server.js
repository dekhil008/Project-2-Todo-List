const express = require("express")
const app = express()

const db =require("./db")
const Todo =require("./todo")

app.use(express.json()) //to read body

app.get("/",(req,res) => {
    res.json(" GET / is working")

    // CRUD: Creat , Read , Update , Deleted
})
app.get("/tasks",(req,res) => {
    Todo.find({}, (err, data) => {
        if (err){
            console.log("ERRor: ",  err )
        }else{
            res.json(data);
        }

    })
})
     //filter?isCompleted=false
                 //?key=value&key=value
app.get("/filter",(req,res) => {
    Todo.find({isCompleted: req.query.isCompleted}, (err, data) => {
        if (err){
            console.log("ERRor: ",  err )
        }else{
            res.json(data);
        }

    })
})

/*
app.get("/completed",(req,res) => {
    Todo.find({isCompleted: true}, (err, data) => {
        if (err){
            console.log("ERRor: ",  err )
        }else{
            res.json(data);
        }

    })
})
app.get("/not_completed",(req,res) => {
    Todo.find({isCompleted: false}, (err, data) => {
        if (err){
            console.log("ERRor: ",  err )
        }else{
            res.json(data);
        }

    })
})
*/

app.post("/tasks",(req,res) => {
   

    Todo.create(req.body , (err, newTask) =>{
        if (err) {
            console.log("ERROR: ",err)
        } else {
            res.status(201).json(newTask)
        }
    })
})


app.delete("/tasks/:id",(req,res) => {
   console.log("35:",req.params.id)

    Todo.deleteOne({_id: req.params.id}, (err, deleteObj) =>{
        if (err) {
            console.log("ERROR: ",err)
        } else {
            deleteObj.deletedCount ===1? 
            res.json("Delete one todo successfully")
            :res.status(404).json("this todo is not found")
            
            
        }
    })
})


app.delete("/tasks",(req,res) => {
   //console.log("35:",req.params.id)

    Todo.deleteOne({isCompleted:true}, (err, deleteObj) =>{
        if (err) {
            console.log("ERROR: ",err)
        } else {
            deleteObj.deletedCount ===0
            ? res.status(404).json("there is no completed todo found")
            : res.json("Delete all completed todos successfully")
            
            
        }
    })
})


app.put("/tasks/:id",(req,res) => {
   //console.log("35:",req.params.id)

    Todo.updateOne(
        {_id: req.params.id},
        {title:req.body.newTitle},
         (err, updateObj) =>{
        if (err) {
            console.log("ERROR: ",err)
            res.status(400).json(err)
        } else {
            updateObj.modifiedCount ===1? 
            res.json("Update one todo successfully")
            :res.status(404).json("this todo is not found")
            
            
        }
    })
})
 
app.put("/tasks/:id/:isCompleted",(req,res) => {
   //console.log("35:",req.params.id)

    Todo.updateOne(
        {_id: req.params.id},
        {isCompleted:req.params.isCompleted},
         (err, updateObj) =>{
        if (err) {
            console.log("ERROR: ",err)
            res.status(400).json(err)
        } else {
            updateObj.modifiedCount ===1? 
            res.json("Update one todo successfully")
            :res.status(404).json("this todo is not found")
            
            
        }
    })
})



app.listen(5000,()=> {
    console.log("SERVER is WORKING ... ")
})