const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port=3000;

app.use(bodyParser.json());

function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}

function removeAtIndex(arr, index) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) newArray.push(arr[i]);
  }
  return newArray;
}

app.get("/todo",(req,res)=>{
    fs.readFile("todos.json","utf-8", (err, data)=>{
        if(err) throw(err)
            else{
                var answer = JSON.parse(data);
                res.json(answer);
            }
    })
    
});

// app.get('/todos/:id', (req, res) => {
//   const todoIndex = findIndex(todos, parseInt(req.params.id));
//   if (todoIndex === -1) {
//     res.status(404).send();
//   } else {
//     res.json(todos[todoIndex]);
//   }
// });

app.post("/todo",(req,res)=>{
    
    let newTodo={
        id: Math.floor(Math.random() * 1000000),
        title: req.body.title,
        description: req.body.description
    }
    fs.readFile("todos.json","utf-8", (err, data)=>{
        if(err) throw (err);
        const todos = JSON.parse(data);
        todos.push(newTodo);
        fs.writeFile("todos.json", JSON.stringify(todos),(err)=>{
            if(err) throw err; 
            res.status(201).json(newTodo);
        })
    })
    
});


// app.put('/todos/:id', (req, res) => {
//   const todoIndex = findIndex(todos, parseInt(req.params.id));
//   if (todoIndex === -1) {
//     res.status(404).send();
//   } else {
//     todos[todoIndex].title = req.body.title;
//     todos[todoIndex].description = req.body.description;
//     res.json(todos[todoIndex]);
//   }
// });

app.delete('/todos/:id', (req, res) => {
  const todoIndex = findIndex(todos, parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos = removeAtIndex(todos, todoIndex);
    res.status(200).send();
  }
});

app.use((req, res, next) => {
  res.status(404).send();
});

app.listen(port,()=>{
    console.log(`App listening`);
})