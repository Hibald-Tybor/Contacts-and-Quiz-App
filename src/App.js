import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-contact.component";
import EditTodo from "./components/edit-contact.component";
import TodosList from "./components/contacts-list.component";
import Quiz from "./components/quiz.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
              <ul className="nav justify-content-center nav-tabs">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Contacts</Link>
                </li>
                <li className="nav-item">
                  <Link to="/quiz" className="nav-link">Quiz</Link>
                </li>
              </ul>
          <br/>
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
          <Route path="/quiz" component={Quiz} />
        </div>
      </Router>
    );
  }
}

export default App;