import {
  ADD_TODO,
  ADD_TODO_SUCCESS,
  TODOS_FAILURE,
  TOGGLE_TODO,
  DELETE_TODO,
  LOADED_TODOS,
  FETCH_TODOS
} from '../actions/todos'

export const TODOS_DEFAULT_STATE = {
  loading: false,
  saving: false,
  error: '',
  items: []
}

export default function todos (state = TODOS_DEFAULT_STATE, action) {
  switch (action.type) {
    case LOADED_TODOS:
      return {...state, items: action.todos, loading: false}

    case FETCH_TODOS: {
      return {...state, loading: true}
    }

    case ADD_TODO:
      return {...state, saving: true}

    case ADD_TODO_SUCCESS:
      return {
        ...state,
        items: state.items.concat(action.todo),
        saving: false
      }

    case TODOS_FAILURE:
      return {...state, loading: false, saving: false, error: action.error}

    case TOGGLE_TODO:
      return {
        ...state,
        items: state.items.map((todo) =>
          todo._id === action.id ? {...todo, done: !todo.done} : todo
        )
      }

    case DELETE_TODO:
      return {
        ...state,
        items: state.items.reduce((items, todo) =>
          todo._id !== action.id ? items.concat(todo) : items, []
        )
      }

    default:
      return state
  }
}
