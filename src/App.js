import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
// import uuid from 'uuid';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    // todos: [
    //   {
    //     id: uuid.v4(),
    //     title: 'Take out the trash',
    //     completed: false
    //   },
    //   {
    //     id: uuid.v4(),
    //     title: 'Dinner with wife',
    //     completed: true
    //   },

    //   {
    //     id: uuid.v4(),
    //     title: 'Meeting with boss',
    //     completed: false
    //   },
    // ]



    todos: []
  }


  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      // this gives us a promise
      // .then(res => console.log(res.data))
      .then(res => this.setState({ todos: res.data }))
  }




  //Toggle complete
  markComplete = (id) => {
    // console.log(id)
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    });
  }


  //Delete Todo 
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
    // console.log(id)

  }


  // Add Todo
  addTodo = (title) => {

    //[[[[[[wont need this anymore
    // const newTodo = {
    //   id: uuid.v4(),
    //   title,
    //   completed: false
    // }
    //install npm i uuid]]]
    // console.log(title) now to add to our state  [spread operator]
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }));

  }


  render() {
    // console.log(this.state.todos);
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>



    );
  }
}



export default App;
