/**
 * Created by Razso_000 on 9/13/2017.
 */
var toDoList = {
    toDo: [],
    addToDo: function (todoText) {
        this.toDo.push({
            todoText: todoText,
            completed: false
        });
    },
    changeToDo: function (x, text) {
        this.toDo[x].todoText = text;
    },
    deleteToDo: function (y) {
        this.toDo.splice(y, 1);
    },
    toggleCompleted: function (position) {
        var toDo = this.toDo[position];
        toDo.completed = !toDo.completed;
    },
    toggleAll: function () {
        var totalTodos = this.toDo.length;
        var completedTodos = 0;
        this.toDo.forEach(function (todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });
        this.toDo.forEach(function(todo) {
            if (completedTodos === totalTodos) {
                todo.completed = false;
            } else {
                todo.completed = true;
            }
        });
    }
};

var handlers = {
    addTodo : function () {
        var addTodoTextInput = document.getElementById('addTodoTextInput');
        toDoList.addToDo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        view.displayTodos();
    },
    changeTodo : function () {
        var todoNumber = document.getElementById('changeTodoNumber');
        var todoText = document.getElementById('changeTodoText');
        toDoList.changeToDo(todoNumber.valueAsNumber, todoText.value);
        todoText.value = '';
        todoNumber.value = '';
        view.displayTodos();
    },
    deleteTodo : function (position) {
        toDoList.deleteToDo(position);
        view.displayTodos();
    },
    toggleCompleted : function () {
        var todoPosition = document.getElementById('toggleTodoNumber');
        toDoList.toggleCompleted(todoPosition.valueAsNumber);
        todoPosition.value = '';
        view.displayTodos();
    },
    toggleAll : function () {
        toDoList.toggleAll();
        view.displayTodos();
    }
};
var view = {
    displayTodos : function () {
        var todoUl = document.getElementById('list');
        todoUl.innerHTML = '';
        toDoList.toDo.forEach(function (todo, position) {
           var todoLi = document.createElement('li');
            //     // Remember to edit li CSS settings
           var todoTextWithCompletion = '';

           if (todo.completed === true) {
             todoTextWithCompletion = '(x)' + todo.todoText;
            } else {
             todoTextWithCompletion = '( )' + todo.todoText;
              }
           todoLi.id = position;
           todoLi.textContent = todoTextWithCompletion;
           todoLi.appendChild(this.createDeleteButton());
           todoLi.appendChild(this.createBreak());
           todoUl.appendChild(todoLi);
        }, this)
    },
    createDeleteButton : function () {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        return deleteButton;

    },
    // Should remove this after sorting out the li css settings
    createBreak : function () {
        var createBreak = document.createElement('br');
        return createBreak;
    },
    setUpEventListeners : function () {
        var todoUl = document.querySelector('ol');
        todoUl.addEventListener('click', function (event) {
            var elementClicked = event.target;
            if (elementClicked.className === 'deleteButton') {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
        });
    }
};
view.setUpEventListeners();

