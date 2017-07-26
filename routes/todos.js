var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var file = path.resolve(__dirname, '../data/todos.json');

router.get('/todos', function (req, res) {
  fs.readFile(file, (err, text) => {
    if (err) {
      throw err;
    }
    
    var todos = JSON.parse(text);
    res.status(200).json(todos);
  });
});

router.post('/todos', function (req, res) {
  fs.readFile(file, (err, text) => {
    if (err) {
      throw err;
    }
    
    var todos = JSON.parse(text);
    var ids = todos.map(v => v.id);
    var last = Math.max.apply(null, ids);
    var todo = {
      id: last + 1,
      title: req.body.title,
      notes: req.body.notes,
      done: false,
      starred: req.body.starred || false,
    };
    
    todos.push(todo);
    
    fs.writeFile(file, JSON.stringify(todos, null, 2), (err, text) => {
      if (err) {
        throw err;
      }
      
      res.status(200).json(todo);
    });
  });  
});

router.get('/todos/:id', function(req, res) {
  fs.readFile(file, (err, text) => {
    if (err) {
      throw err;
    }
    
    var todos = JSON.parse(text);
    var id = Number(req.params.id);
    var todo = todos.find(v => v.id === id);
    
    if (!todo) {
      return res.status(404).json(null);
    }
    
    res.status(200).json(todo);
  });
});

router.put('/todos/:id', function (req, res) {
  fs.readFile(file, (err, text) => {
    if (err) {
      throw err;
    }
    
    var todos = JSON.parse(text);
    var id = Number(req.params.id);
    var todo = todos.find(v => v.id === id);
    
    if (!todo) {
      return res.status(404).json(null);
    }
    
    Object.assign(todo, {
      title: req.body.title || todo.title,
      notes: req.body.notes || todo.notes,
      done: req.body.done || todo.done,
      starred: req.body.starred || todo.done,
    });
    
    fs.writeFile(file, JSON.stringify(todos, null, 2), (err, text) => {
      if (err) {
        throw err;
      }
      
      res.status(200).json(todo);
    });
  });
});

module.exports = router;