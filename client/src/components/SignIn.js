import React, { Component } from "react";

export default class SignIn extends Component {
  render() {
    return (
      <div>
        <form action="http://localhost:5000/users/info">
          <input type="text" name="cwid" value="" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
