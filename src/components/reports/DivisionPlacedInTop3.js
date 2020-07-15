import React, { Component } from 'react'
import RaceManager from '../../modules/RaceManager'
//import Accordion from 'react-bootstrap/Accordion'
//import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
//import Button from 'react-bootstrap/Button'
import DistanceManager from '../../modules/DistanceManager'

class DivisionPlaced extends Component {
    //define what this component needs to render
    state = {
        racesInState: [],
        distancesInState: [],
        top3InState: [],
        loadingStatus: false
    };

    componentDidMount() {


        RaceManager.getAll(JSON.parse(localStorage.getItem("credentials")).userId)
            .then((racesFromAPI) => {

                DistanceManager.getAll()
                    .then((distancesFromAPI) => {
                        let divisionTop3Array = []
                        for (let d = 0; d < distancesFromAPI.length; d++) {
                            console.log("this is the distance", distancesFromAPI[d])

                            const filteredRaces = racesFromAPI.filter(race => race.distanceId === distancesFromAPI[d].id)
                            console.log("these are the filtered races", filteredRaces)

                            const top3byDistance = filteredRaces.filter(place => place.ageGenderPlace.split("/")[0] <= "3")
                            console.log("These are the Top3 By Distance", top3byDistance)

                            if (top3byDistance[0] !== undefined) {
                                for (let i = 0; i < top3byDistance.length; i++) { divisionTop3Array.push(top3byDistance[i]) }
                                console.log("In Top 3", divisionTop3Array)
                            }

                            this.setState({ top3InState: divisionTop3Array })
                        }

                    }
                    )})
    }

    render() {

        return (
            <>
                <h5 style={{ textAlign: 'center', color: '#2c3d55', fontFamily: 'comfortaa, arial, san-serif' }}>Division Placement in Top 3</h5>

                <Table striped bordered hover>
                    <thead style={{ textAlign: 'center' }}>
                        <tr>
                            <th>Distance</th>
                            <th>Date</th>
                            <th>Race Name</th>
                            <th>Location</th>
                            <th>Division Place</th>
                        </tr>
                    </thead>
                    {this.state.top3InState.map((currentRaceInLoop) => {
                        return (
                            <>
                                <tbody>
                                    <tr style={{textAlign: 'center'}}>
                                        <td>{currentRaceInLoop.distance.name}</td>
                                        <td>{currentRaceInLoop.date}</td>
                                        <td>{currentRaceInLoop.name}</td>
                                        <td>{currentRaceInLoop.location}</td>
                                        <td style={{backgroundColor: '#f3532b'}}>{currentRaceInLoop.ageGenderPlace}</td>
                                    </tr>
                                </tbody>
                            </>)
                    })}
                </Table>

    </>)}}

 export default DivisionPlaced