import {
  ADD_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  TOGGLE_TODO,
  DELETE_TODO,
  SET_TODOS
} from '../actions/todos'

const DEFAULT_STATE = {
  loading: false,
  saving: false,
  error: '',
  items: []
}

export default function todos (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_TODOS:
      return {...state, items: action.items, loading: false}

    case ADD_TODO:
      return {...state, saving: true}

    case ADD_TODO_SUCCESS:
      return {
        ...state,
        items: state.items.concat(action.todo),
        saving: false
      }

    case ADD_TODO_FAILURE:
      return {...state, saving: false, error: action.error}

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
        items: state.reduce((items, todo) =>
          todo._id !== action.id ? items.concat(todo) : items, []
        )
      }

    default:
      return state
  }
}
