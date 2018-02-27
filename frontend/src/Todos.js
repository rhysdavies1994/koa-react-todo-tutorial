
import React, { Component } from 'react'
import 'bulma/css/bulma.css'

const Todo = ({ todo, id }) => (
  <div className="box todo-item level is-mobile">
    <div className="level-left">
      <label className={`level-item todo-description ${todo.done && 'completed'}`}>
        <input className="checkbox" type="checkbox"/>
        <span>{todo.description}</span>
      </label>
    </div>
    <div className="level-right">
      <a className="delete level-item" onClick={() => {}}>Delete</a>
    </div>
  </div>
)

class Todos extends Component {
  state = {
    newTodo: '',
    todos: [],
    error: '',
    isLoading: false
  }

  componentDidMount() {
    this.fetchTodos()
  }

  fetchTodos () {
    this.setState({ isLoading: true })

    // HTTP GET Request to our backend api and load into state
    fetch('v1/todos')
      .then((res) => res.json())
      .then(todos => this.setState({ isLoading: false, todos }))
      .catch((error) => this.setState({ error: error.message }))
  }

  addTodo (event) {
    event.preventDefault() // Prevent form from reloading page
    const { newTodo, todos } = this.state

    if(newTodo) {
      this.setState({
        newTodo: '',
        todos: todos.concat({ description: newTodo, done: false })
      })
    }
  }

  render() {
    let { todos, newTodo, isLoading, error } = this.state

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
              <button className={`button is-success ${isLoading && "is-loading"}`}
                      disabled={isLoading}>Add</button>
            </div>
          </div>
        </form>

        <div className="container todo-list">
          {todos.map((todo) => <Todo key={todo._id} id={todo._id} todo={todo}/> )}
          <div className="white">
            Total: {total}  , Complete: {complete} , Incomplete: {incomplete}
          </div>
        </div>
      </section>
    );
  }
}

export default Todos
