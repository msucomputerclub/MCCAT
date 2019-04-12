import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    meetingDate: ""
  };
  componentDidMount() {
    fetch(
      `http://localhost:5000/api/meeting/${new Date().toLocaleDateString()}`
    )
      .then(response => response.json())
      .then(result => {});
  }

  render() {
    return <div className="App" />;
  }
}

export default App;
