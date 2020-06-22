import { Route, withRouter, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import Home from './home/Home'
import Login from './auth/Login'
import RaceForm from './races/RaceForm'
import RaceList from './races/RaceList'

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
                <Route
                    path="/races/new"
                    render={(props) => {
                        return <RaceForm {...props} />
                    }} />

                <Route exact path="/races"
                    render={(props) => {
                        if (this.isAuthenticated()) {
                            return <RaceList {...props} />
                        } else {
                            return <Redirect to="/login" />
                        }
                    }} />

                <Route path="/login" component={Login} />

            </>
        )
    }
}


export default ApplicationViews