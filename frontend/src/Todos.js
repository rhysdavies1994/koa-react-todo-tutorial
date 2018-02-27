
import React, { Component } from 'react'
import 'bulma/css/bulma.css'
import { connect } from 'react-redux'
import { addTodo, toggleTodo, deleteTodo, fetchTodos } from './actions/todos';

const Todo = ({ todo, id, onDelete, onToggle }) => (
  <div className="box todo-item level is-mobile">
    <div className="level-left">
      <label className={`level-item todo-description ${todo.done && 'completed'}`}>
        <input className="checkbox" type="checkbox" checked={todo.done} onChange={onToggle}/>
        <span>{todo.description}</span>
      </label>
    </div>
    <div className="level-right">
      <a className="delete level-item" onClick={onDelete}>Delete</a>
    </div>
  </div>
)

class Todos extends Component {
  state = { newTodo: '' }

  componentDidMount() {
    this.props.fetchTodos()
  }

  addTodo (event) {
    event.preventDefault() // Prevent form from reloading page
    const { newTodo } = this.state

    if(newTodo) {
      const todo = { description: newTodo, done: false }
      this.props.addTodo(todo)
      this.setState({ newTodo: '' })
    }
  }

  render() {
    let { newTodo } = this.state
    const { todos, isLoading, isSaving, error, deleteTodo, toggleTodo } = this.props

    const total = todos.length
    const complete = todos.filter((todo) => todo.done).length
    const incomplete = todos.filter((todo) => !todo.done).length

    return (
      <section className="section full-column">
        <h1 className="title white">Todos</h1>
        <div className="error">{error}</div>

        <form className="form" onSubmit={this.addTodo.bind(this)}>
          <div className="field has-addons" style={{ justifyContent: 'center' }}>
            <div className="control">
              <input className="input"
                     value={newTodo}
                     placeholder="New todo"
                     onChange={(e) => this.setState({ newTodo: e.target.value })}/>
            </div>

            <div className="control">
              <button className={`button is-success ${(isLoading || isSaving) && "is-loading"}`}
                      disabled={isLoading || isSaving}>Add</button>
            </div>
          </div>
        </form>

        <div className="container todo-list">
          {todos.map((todo) => <Todo key={todo._id}
                                     id={todo._id}
                                     todo={todo}
                                     onDelete={() => deleteTodo(todo._id)}
                                     onToggle={() => toggleTodo(todo._id)}/> )}
          <div className="white">
            Total: {total}  , Complete: {complete} , Incomplete: {incomplete}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.items,
    isLoading: state.todos.loading,
    isSaving: state.todos.saving,
    error: state.todos.error
  }
}

const mapDispatchToProps = {
  addTodo,
  toggleTodo,
  deleteTodo,
  fetchTodos
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos)
