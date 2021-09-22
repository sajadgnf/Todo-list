let $ = document

const inputTodo = $.querySelector("#todo_input")
const addTodoBtn = $.querySelector(".add_btn")
const removeTodoBtn = $.querySelector(".remove_btn")
const todoBox = $.querySelector(".todo")
const doneBox = $.querySelector(".done")
const errorText = $.querySelector(".error")
var todoList = []
var doneList = []

// Empty Frame Error
const error = item => {
    if (item) {
        return true
    }
    errorText.innerHTML = "Please Fill The Frame First"
    return false
}

// Clear Error
const clearError = () => {
    errorText.innerHTML = ""
}

// Bild Todo
const bildTodo = () => {
    todoBox.innerHTML = ""
    doneBox.innerHTML = ""
    var counter = 1

    // Active Project
    todoList.forEach((item, index) => {
        // Todo Item
        let todoItem = $.createElement("div")
        todoItem.setAttribute("class", "todo_item")
        todoItem.setAttribute("id", counter + "item")
        todoItem.addEventListener("dragstart", event => {
            event.dataTransfer.setData("done", event.target.id)
            todoList.splice(index, 1)
        })

        // Todo Text
        let todoText = $.createElement("h3")
        todoText.innerHTML = item

        // Tick Icon
        let todoTick = $.createElement("i")
        todoTick.classList.add("todo_tick")
        todoTick.addEventListener("click", () => {
            tickDoneProject(todoItem, index)
        })

        todoItem.append(todoText, todoTick)
        todoBox.appendChild(todoItem)

        counter++
    })

    // doneProject
    doneList.forEach((element, index) => {
        // Todo Item
        let todoItem = $.createElement("div")
        todoItem.setAttribute("class", "todo_item")
        todoItem.setAttribute("id", counter + "item")
        todoItem.addEventListener("dragstart", event => {
            event.dataTransfer.setData("do", event.target.id)
            doneList.splice(index, 1)
        })

        // Todo Text
        let todoText = $.createElement("h3")
        todoText.innerHTML = element
        todoText.style.textDecoration = "line-through"
        todoText.style.color = "#444"

        // Tick Icon
        let todoTick = $.createElement("i")
        todoTick.classList.add("fa", "fa-check")
        todoTick.addEventListener("click", () => {
            tickDoneProject(todoItem, index)
        })

        todoItem.append(todoText, todoTick)
        doneBox.append(todoItem)

        counter++
    })
}

// Add Todo
const addTodo = event => {
    event.preventDefault()

    if (!error(inputTodo.value)) {
        return false
    }

    todoList.push(inputTodo.value)
    localStorage.setItem("todoList", JSON.stringify(todoList))

    bildTodo()

    inputTodo.value = ""
}

// Tick Done Project
const tickDoneProject = (item, index) => {
    if (item.lastElementChild.className == "todo_tick") {
        doneList.push(item.firstElementChild.innerHTML)
        todoList.splice(index, 1)
        console.log(index)
    }

    else {
        todoList.push(item.firstElementChild.innerHTML)
        doneList.splice(index, 1)
        console.log(index)
    }

    localStorage.setItem("doneList", JSON.stringify(doneList))
    localStorage.setItem("todoList", JSON.stringify(todoList))
    fetchTodoList()
}

// Remove Todo
const removeTodo = event => {
    let confirmDeleteList = confirm("Are You Sure To Delete ?")
    if (confirmDeleteList) {
        event.preventDefault()
        doneList.length = 0
    }
    localStorage.setItem("doneList", JSON.stringify(doneList))
    fetchTodoList()
}

// Drag Done Items
const dropDoneItems = (event, index) => {
    let getItem = event.dataTransfer.getData("done")
    event.target.append($.getElementById(getItem))
    doneList.push($.getElementById(getItem).firstElementChild.innerHTML)
    bildTodo()

    localStorage.setItem("doneList", JSON.stringify(doneList))
    localStorage.setItem("todoList", JSON.stringify(todoList))
    fetchTodoList()
}

// Drag Do Items
const dropDoItems = (event, index) => {
    let getItems = event.dataTransfer.getData("do")
    event.target.append($.getElementById(getItems))
    todoList.push($.getElementById(getItems).firstElementChild.innerHTML)
    bildTodo()

    localStorage.setItem("doneList", JSON.stringify(doneList))
    localStorage.setItem("todoList", JSON.stringify(todoList))
    fetchTodoList()
}

// fetchTodoList
const fetchTodoList = () => {
    if (localStorage.getItem("todoList") && localStorage.getItem("doneList")) {
        doneList = JSON.parse(localStorage.getItem("doneList"))
        todoList = JSON.parse(localStorage.getItem("todoList"))
    }
    else {
        todoList = []
        doneList = []
        localStorage.setItem("todoList", JSON.stringify(todoList))
        localStorage.setItem("doneList", JSON.stringify(doneList))
    }
    bildTodo()
}


// Events
addTodoBtn.addEventListener("click", addTodo)
inputTodo.addEventListener("focus", clearError)
removeTodoBtn.addEventListener("click", removeTodo)
doneBox.addEventListener("drop", dropDoneItems)
todoBox.addEventListener("drop", dropDoItems)
doneBox.addEventListener("dragover", event => event.preventDefault())
todoBox.addEventListener("dragover", event => event.preventDefault())
fetchTodoList()
