const form = document.querySelector('#new-todo-form')
const todoinput = document.querySelector('#todo-input')
const list = document.querySelector('#list')
const template = document.querySelector('#list-item-template')

const local_storage_prefix = 'advanced-todo-list'
const todos_storage_key = `${local_storage_prefix}-todos`
let todos = loadtodos()
todos.forEach(rendertodo)

list.addEventListener('change', e => {
    if (!e.target.matches('[data-list-item-checkbox]')) return

    const parent = e.target.closest('.list-item')
    const todoID = parent.dataset.todoID
    const todo = todos.find(t => t.id === todoID)
    todo.complete = e.target.checked
    savetodos()

})


list.addEventListener('click', e => {
    if (!e.target.matches('[data-button-delete]')) return
    const parent = e.target.closest('.list-item')
    const todoID = parent.dataset.todoID
    parent.remove()
    todos = todos.filter(todo => todo.id !== todoID)
    savetodos()

})


form.addEventListener('submit', e => {
    e.preventDefault()

    const todoname = todoinput.value
    if (todoname === '') return // edges cases
    const newtodo = {
        name: todoname,
        complete: false,
        id: new Date().valueOf().toString()
    }
    todos.push(newtodo)

    rendertodo(newtodo)
    savetodos()
    todoinput.value = ''


})

function rendertodo(todo) {
    const templateclone = template.content.cloneNode(true)

    const listitem = templateclone.querySelector('.list-item')
    listitem.dataset.todoID = todo.id

    const textelement = templateclone.querySelector("[data-list-item-text]")
    textelement.innerText = todo.name

    const checkedbox = templateclone.querySelector('[data-list-item-checkbox]')
    checkedbox.checked = todo.complete

    list.appendChild(templateclone)
}


function loadtodos() {
    const todostring = localStorage.getItem(todos_storage_key)
    return JSON.parse(todostring) || []
}


function savetodos() {
    localStorage.setItem(todos_storage_key, JSON.stringify(todos))
}