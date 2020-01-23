var express = require("express"),
    router = express.Router(),
    db = require("../models/index"),
    helpers = require("../helpers/todos")
    


router.route("/api/todos")
  .get(helpers.getTodos)
  .post(helpers.createTodo)

router.route("/api/todos/:todoId")
  .get(helpers.getTodo)
  .put(helpers.updateTodo)
  .delete(helpers.deleteTodo)

module.exports = router