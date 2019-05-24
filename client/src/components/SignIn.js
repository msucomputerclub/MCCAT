import React, { Component } from "react";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { cwid: "", response: "" };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { cwid } = this.state;
    console.log(`inside submit. cwid: ${cwid}`);

    fetch("http://localhost:5000/api/meeting/signin", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        cwid
      })
    })
      .then(response => {
        if (!response.ok) {
          
        }
        response.json();
      })
      .then(res => {
        console.log(`response ${res}`);
      })
      .catch(err => {
        console.log(`error ${err}`);
      });

    // axios
    //   .post("localhost:5000/", { cwid }, { crossdomain: true })
    //   .then(response => {
    //     console.log(`reponse: ${response}`);
    //   });
  };

  render() {
    const { cwid } = this.state;
    return (
      <div>
        <form
          onSubmit={this.onSubmit}
          // style={{ position: "absolute", left: "-99em" }}
        >
          <input name="cwid" value={cwid} autoFocus onChange={this.onChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
