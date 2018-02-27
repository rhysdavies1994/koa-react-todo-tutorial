// action types
export const ADD_TODO = 'ADD_TODO'
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const SET_TODOS = 'SET_TODOS'
export const FETCH_TODOS = 'FETCH_TODOS'

// action creators
export function addTodo(todo) {
  return { type: ADD_TODO, todo }
}

export function addTodoSuccess(todo) {
  return { type: ADD_TODO_SUCCESS, todo }
}

export function addTodoFailure(error) {
  return { type: ADD_TODO_FAILURE, error }
}

export function toggleTodo(id) {
  return { type: TOGGLE_TODO, id }
}

export function deleteTodo(id) {
  return { type: DELETE_TODO, id }
}

export function setTodos(todos) {
  return { type: SET_TODOS, todos }
}

export function fetchTodos() {
  return { type: FETCH_TODOS }
}
