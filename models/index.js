var mongoose = require("mongoose")

mongoose.set("debug", true) //allows us to see when things are being sent from the database or failing 
mongoose.connect("mongodb://localhost:27017/todo-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.Promise = Promise // allows us to write .then instead of function callbacks when interacting with the database 

module.exports.Todo = require("./todo")