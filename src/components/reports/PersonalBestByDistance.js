import React, { Component } from 'react'
import RaceManager from '../../modules/RaceManager'
//import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
//import Button from 'react-bootstrap/Button'
import DistanceManager from '../../modules/DistanceManager'
import { CardColumns } from 'react-bootstrap';

class PersonalBest extends Component {
    //define what this component needs to render
    state = {
        racesInState: [],
        distancesInState: [],
        personalBestInState: [],
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
                        let personalBestArray = []
                        for (let d = 0; d < distancesFromAPI.length; d++) {
                            console.log("this is the distance", distancesFromAPI[d])
                            //distancesInState: distancesFromAPI
                            // const result = words.filter(word => word.length > 6);
                            const filteredRaces = racesFromAPI.filter(race => race.distanceId === distancesFromAPI[d].id)
                            console.log("these are the filtered races", filteredRaces)

                            const sortedRaces = filteredRaces.sort((function (a, b) { return a.netTime.split(":")[0] - b.netTime.split(":")[0] }))

                            console.log("personal best", sortedRaces[0])

                            if (sortedRaces[0] !== undefined) {
                                personalBestArray.push(sortedRaces[0])
                            }
                        }
                        this.setState({ personalBestInState: personalBestArray })
                    }

                    )
            }
            )
    }

    render() {

        return (
            <>
                <h5 style={{ textAlign: 'center', color: '#2c3d55', fontFamily: 'comfortaa, arial, san-serif' }}>Personal Best by Distance Report</h5>
                {this.state.personalBestInState.map((currentPRInLoop) => {
                    return (
                        <CardColumns>
                        <Card variant="info" style={{ width: '18rem', backgroundColor: '#0593b3' }}>
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center', color: '#f3532b', fontWeight: 'bold' }}> {currentPRInLoop.distance.name}<br></br>
                                </Card.Title>
                                <Card.Subtitle style={{ color: '#f3532b', fontWeight: 'bold', textAlign: 'center' }}>{currentPRInLoop.netTime}
                                </Card.Subtitle><br></br>
                                <Card.Text style={{ textAlign: 'center' }}>
                                    {currentPRInLoop.date}<br></br>
                                    {currentPRInLoop.name}<br></br>
                                    {currentPRInLoop.location}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        </CardColumns>)
                })}

            </>
        )
    }

}


export default PersonalBest