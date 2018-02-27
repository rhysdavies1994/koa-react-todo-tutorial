import { combineReducers } from 'redux'
import todos, { TODOS_DEFAULT_STATE } from './todos'

const todoApp = combineReducers({
  todos
})

export const DEFAULT_STATE = {
  todos: TODOS_DEFAULT_STATE
}

export default todoApp
