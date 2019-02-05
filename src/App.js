import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import TodosList from "./components/contacts/contacts-list.component";
import Quiz from "./components/quiz/quiz.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid page-container">
          <div className="navigation-container">
              <Link to="/" className="navlink">Contacts</Link>
              <Link to="/quiz" className="navlink">Quiz</Link>
            </div>

            <Route path="/" exact component={TodosList} />
            <Route path="/quiz" component={Quiz} />
        </div>
      </Router>
    );
  }
}

export default App;