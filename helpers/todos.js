var db = require("../models/index")


module.exports.getTodos = function(req, res) {
  // res.json({message: "router is working"})
  db.Todo.find({}).then(function(foundTodos) {
    res.json(foundTodos)
  }).catch(function(err) {
    res.send(err)
  })
}

module.exports.createTodo = function(req, res) {
  db.Todo.create(req.body).then(function(createdTodo) {
    res.status(201).json(createdTodo)
  }).catch(function(err) {
    res.send(err)
  })
}

module.exports.getTodo = function(req, res) {
  db.Todo.findById(req.params.todoId).then(function(foundTodo) {
    res.json(foundTodo)
  }).catch(function(err) {
    res.send(err)
  })
}

module.exports.updateTodo = function(req, res) {
  db.Todo.findOneAndUpdate({_id:req.params.todoId}, req.body, {new:true}).then(function(updatedTodo) {
    res.json(updatedTodo)
  }).catch(function(err) {
    res.send(err)
  })
}

module.exports.deleteTodo = function(req, res) {
  db.Todo.remove({_id:req.params.todoId}).then(function() {
    res.send("deleted")
  }).catch(function(err) {
    res.send(err)
  })
}