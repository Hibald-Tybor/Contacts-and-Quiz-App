import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import TodosList from "./components/contacts/contacts-list.component";
import Quiz from "./components/quiz/quiz.component";

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
          <Route path="/quiz" component={Quiz} />
        </div>
      </Router>
    );
  }
}

export default App;