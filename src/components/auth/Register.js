import React, { Component } from 'react';
import UserManager from "../../modules/UserManager"
import { Form, Button} from 'react-bootstrap';

class Register extends Component {

    state = {
        email: "",
        password: "",
        username: "",
        loadingStatus: false,
    };


    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    constructNewUser = evt => {
        evt.preventDefault();
        let emailBool = false;
        let userNameBool = false;
        let emailArray = [];
        let userNameArray = [];

        UserManager.getAll().then((usersArray) => {
            emailArray = usersArray.filter((user) => user.email === this.state.email)
            userNameArray = usersArray.filter((user) => user.username === this.state.username)
        })

        if (this.state.email === "" || this.state.password === "" || this.state.username === "") {
            window.alert("Please make sure to fill out email, password and user name in the register form")
        } else {

            if(emailArray.length === 0){
                emailBool = true;
            } else {
                alert("This email address is taken")
            }

            if(userNameArray.length === 0){
                userNameBool = true;
            } else {
                alert("This username is taken")
            }


            if(emailBool === true && userNameBool === true){
                this.setState({ loadingStatus: true });
                const user = {
                    email: this.state.email,
                    password: this.state.password,
                    username: this.state.username,
                }

                UserManager.post(user).then(() => this.props.history.push("/"))
            }
          
        }
    };


    render() {
        return(
            <>
            <Form>
                <Form.Label>Email: </Form.Label>
                    <Form.Control
                        type="text"
                        required
                        onChange={this.handleFieldChange}
                        id="email"
                        placeholder="Email"
                        />
                        <Form.Label>Username: </Form.Label>
                        <Form.Control
                        type="text"
                        required
                        onChange={this.handleFieldChange}
                        id="username"
                        placeholder="Username"
                        />
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="text"
                        required
                        onChange={this.handleFieldChange}
                        id="password"
                        placeholder="Password"
                        />
                        <Button
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={this.constructNewUser}
                        >Register</Button>
                    
                
            </Form>
            </>
        )
    }

}

export default Register