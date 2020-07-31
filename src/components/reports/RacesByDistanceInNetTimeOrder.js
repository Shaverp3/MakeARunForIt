import React, { Component } from 'react'
import RaceManager from '../../modules/RaceManager'
//import Accordion from 'react-bootstrap/Accordion'
//import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
//import Button from 'react-bootstrap/Button'
import DistanceManager from '../../modules/DistanceManager'

class DistanceOrderedByFastest extends Component {
    //define what this component needs to render
    state = {
        racesInState: [],
        distancesInState: [],
        racesByDistanceInState: [],
        loadingStatus: false
    };

    componentDidMount() {


        RaceManager.getAll(JSON.parse(localStorage.getItem("credentials")).userId)
            .then((racesFromAPI) => {

                const netSeconds = +racesFromAPI[0].netTime.split(":")[0]
                const netSeconds2 = +racesFromAPI[1].netTime.split(":")[0]
                console.log("race 1", racesFromAPI[0], netSeconds)
                console.log("race 2", racesFromAPI[1], netSeconds2)
                DistanceManager.getAll()
                    .then((distancesFromAPI) => {
                        let distanceSortedByTimeArray = []

                        for (let d = 0; d < distancesFromAPI.length; d++) {
                            console.log("this is the distance", distancesFromAPI[d])

                            // const result = words.filter(word => word.length > 6);
                            const filteredRaces = racesFromAPI.filter(race => race.distanceId === distancesFromAPI[d].id)
                            console.log("these are the filtered races", filteredRaces)

                            const sortedRaces = filteredRaces.sort((function (a, b) { return a.netTime.split(":")[0] - b.netTime.split(":")[0] }))
                            console.log("these are the sorted races", sortedRaces)

                            if (sortedRaces[0] !== undefined) {
                                let distanceObject = {
                                    distanceName: distancesFromAPI[d].name,
                                    races: sortedRaces
                                }
                                console.log(distanceObject)
                                distanceSortedByTimeArray.push(distanceObject)
                            }
                        }
                        this.setState({ racesByDistanceInState: distanceSortedByTimeArray })
                    }
                    )
            })
    }


    render() {

        return (
            <>
                <h5 style={{ textAlign: 'center', color: '#f3532b', fontFamily: 'comfortaa, arial, san-serif', fontWeight:"bold", backgroundColor: '#ebebeb', marginBottom:'20px'}}>All Races By Distance and Time</h5>
                {this.state.racesByDistanceInState.map((currentDistanceInLoop) => {
                    console.log(currentDistanceInLoop)
                    return (<>
                        <Table striped bordered hover>
                            
                            <thead style={{fontSize: '14px', textAlign: 'center', backgroundColor: '#0593b3', color: '#f3532b', fontWeight:'bold', textShadow: '2px 2px 5px black'}}>{currentDistanceInLoop.distanceName}</thead> 
                                <tr style={{backgroundColor: '#ebebeb', opacity: '.90'}}>
                                    <th style={{borderTop: 'double', borderTopColor: 'black',borderWidth: '2px'}}>Date</th>
                                    <th>Race Name</th>
                                    <th>Location</th>
                                    <th>Net Time/Ascending</th>
                                </tr>
                            
                            {currentDistanceInLoop.races.map((currentRaceInLoop) => {
                                return (<>
                                    <tbody style={{backgroundColor: '#0593b3', color: '#ebebeb', opacity: '.90', fontWeight:'bold'}}>
                                        <tr>
                                            <td>{currentRaceInLoop.date}</td>
                                            <td>{currentRaceInLoop.name}</td>
                                            <td>{currentRaceInLoop.location}</td>
                                            <td>{currentRaceInLoop.netTime}</td>
                                        </tr>
                                    </tbody>
                                </>)
                            })}
                        </Table>
                    </>
                    )
                })
                }</>)}}

export default DistanceOrderedByFastest