import React, { Component } from "react"
import UserManager from "../../modules/UserManager"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from "react-router-dom"
class Login extends Component {

  state = {
    email: "",
    password: "",
  }


  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }


  handleLogin = (e) => {
    e.preventDefault()
    UserManager.filterGetAll(this.state.email, this.state.password)
      //console.log(this.state.email, this.state.password)
      .then((usersArray) => {
         if (usersArray.length === 0) {
          //console.log(usersArray)
         alert("Please enter a valid email address and password.  Or click Register if you are a new user.")
         } else {
        localStorage.setItem(
          "credentials",
          JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            userId: usersArray[0].id,
          })
        )}
    this.props.history.push("/");
  }
      )
    }

  handleRegister = () => {
    this.props.history.push("/register")
  }

  render() {
    return (
      <Form onSubmit={this.handleLogin}>
        <h3>Welcome to Make a Run For It!</h3>
        <h4>Please sign in</h4>

        <Form.Label>Email Address: </Form.Label>
        <Form.Control
          onChange={this.handleFieldChange}
          type="email"
          id="email"
          placeholder="Email address"
          required
          autoFocus="" />

        <Form.Label>Password: </Form.Label>
        <Form.Control
          onChange={this.handleFieldChange}
          type="password"
          id="password"
          placeholder="Password"
          required />
        <Button
          className="submit-btn"
          variant="success"
          style={{ float: 'left', backgroundColor: '#f3532b', color: '#0f6b8d' }}
          type="submit"
          size="sm"
          >
          Sign in
        </Button>
        <Button
          className="submit-btn"
          variant="success"
          style={{ float: 'right', backgroundColor: '#0f6b8d', color: '#f3532b' }}
          type="button"
          size="sm"
          onClick={() => this.handleRegister()}>
          Register Account
       </Button>
      </Form>
    )
  }

}

export default Login
