const express = require("express")
const app= express();
const bodyParser= require("body-parser");
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let todos =[];

function findIndex(arr, ind){
    for(let i=0; i< arr.length; i++){
        if(arr[i].id === ind){
            return i;
        }
    }
    return -1;
}

function removeIndex(arr, index){
    let newArray= [];
    for(let i=0; i< arr.length; i++){
        if(i !== index){
            newArray.push(arr[i]);
        }
    }
    return newArray;
}

app.get("/todo",(req, res)=>{
    res.json(todos);
});

app.post("/todo",(req, res)=>{
    let newTodo={
        id: Math.floor(Math.random()* 10000),
        title: req.body.title,
        description: req.body.description
    }
    todos.push(newTodo);
    res.status(200).json(newTodo);
})

app.delete("/todo/:id",(req, res)=>{
    let id= parseInt(req.params.id);
    let index= findIndex(todos, id);
    if(index === -1){
        res.status(404).send("Todo Id Not found");
    }
    else{
        todos = removeIndex(todos, index);
        res.status(200).send("deleted succesfully");
    }
})

app.use((req, res, next)=>{
    res.status(404).send("Route not found");
})

app.listen(port, ()=>{
    console.log(`Example app listening on Port ${port}`);
})