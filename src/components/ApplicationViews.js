import { Route, withRouter, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import Home from './home/Home'
import Login from './auth/Login'
import RaceForm from './races/RaceForm'
import RaceList from './races/RaceList'
import Register from './auth/Register'
import PersonalBestByDistance from './reports/PersonalBestByDistance'
import DivisionPlacedInTop3 from './reports/DivisionPlacedInTop3'
import RacesByDistanceInNetTimeOrder from './reports/RacesByDistanceInNetTimeOrder'

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
                    if (this.isAuthenticated()) {
                        return <Home />
                    } else {
                        return <Redirect to="/login" />;
                    }
                }}
                />

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

                <Route path="/reports/PersonalBest"
                    render={(props) => {
                        if (this.isAuthenticated()) {
                            return <PersonalBestByDistance {...props} />
                        } else {
                            return <Redirect to="/login" />
                        }
                    }}
                />

                <Route path="/reports/DivisionPlaced"
                    render={(props) => {
                        if (this.isAuthenticated()) {
                            return <DivisionPlacedInTop3 {...props} />
                        } else {
                            return <Redirect to="/login" />
                        }
                    }}
                />
                <Route path="/reports/DistanceByFastest"
                    render={(props) => {
                        if (this.isAuthenticated()) {
                            return <RacesByDistanceInNetTimeOrder {...props} />
                        } else {
                            return <Redirect to="/login" />
                        }
                    }}
                />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />

            </>
        )
    }
}


export default ApplicationViews