import { Route, withRouter, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import Home from './home/Home'
import Login from './auth/Login'

class ApplicationViews extends Component {

    isAuthenticated = () => localStorage.getItem("credentials") !== null

    //^^ this is the same as below
    // isAuthenticated = function () {
    //   if (localStorage.getItem("credentials") !== null) {
    //     return true
    //   } else {
    //     return false
    //   }
    // }

    render() {
        return (
            <>
                <Route exact path="/" render={(props) => {
                    return <Home />
                }} />

                <Route path="/login" component={Login} />
            </>
        )
    }
}


export default ApplicationViews