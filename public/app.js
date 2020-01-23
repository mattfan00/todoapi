$(document).ready(function() {
  $.getJSON("/api/todos").then(displayTodos)

  $("ul").on("click", "li span", function(event) {
    event.stopPropagation()
    removeTodo($(this).parent())
  });

  $("ul").on("click", "li", function() {
    updateTodo($(this))
  })

  $("#todoInput").keypress(function(event) {
    if(event.which == 13) {
      var newTodoName = $("#todoInput").val()
      $.post("/api/todos", {name:newTodoName}).then(function(createdTodo) {
        displayTodo(createdTodo)
        $("#todoInput").val("")
      })
    }
  })
})



function displayTodos(data) {
  data.forEach(todo => {
    displayTodo(todo)
  });
}

function displayTodo(todo) {
  var newTodo = $("<li class='task'>" + todo.name + "<span>x</span></li>")
  newTodo.data("id", todo._id)
  newTodo.data("completed", todo.completed)
  if (todo.completed){
    newTodo.addClass("done")
  }
  $(".list").append(newTodo)
}

function removeTodo(listItem) {
  var todoId = listItem.data().id
  $.ajax({
    method: "DELETE",
    url: "/api/todos/" + todoId
  }).done(function() {
    listItem.remove()
  })
}

function updateTodo(listItem) {
  var todoId = listItem.data().id
  var todoCompleted = listItem.data().completed
  if(!todoCompleted) {
    $.ajax({
      method: "PUT",
      url: "/api/todos/" + todoId,
      data: {completed: true}
    }).done(function() {
      listItem.data("completed", true)
      listItem.addClass("done")
    })
  } else {
    $.ajax({
      method: "PUT",
      url: "/api/todos/" + todoId,
      data: {completed: false}
    }).done(function() {
      listItem.data("completed", false)
      listItem.removeClass("done")
    })
  }
  
}