import React, { Component } from 'react'
import RaceManager from '../../modules/RaceManager'
//import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
//import Button from 'react-bootstrap/Button'
import DistanceManager from '../../modules/DistanceManager'

class DistanceOrderedByFastest extends Component {
    //define what this component needs to render
    state = {
        racesInState: [],
        distancesInState: [],
        racesSortedByTimeInState: [],
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
                        let sortedByTimeArray = []
                        for (let d = 0; d < distancesFromAPI.length; d++) {
                            console.log("this is the distance", distancesFromAPI[d])
                            //distancesInState: distancesFromAPI
                            // const result = words.filter(word => word.length > 6);
                            const filteredRaces = racesFromAPI.filter(race => race.distanceId === distancesFromAPI[d].id)
                            console.log("these are the filtered races", filteredRaces)

                            const sortedRaces = filteredRaces.sort((function (a, b) { return a.netTime.split(":")[0] - b.netTime.split(":")[0] }))

                            console.log("personal best", sortedRaces[0])

                            if (sortedRaces[0] !== undefined) {
                                for (let i = 0; i < sortedRaces.length; i++) { sortedByTimeArray.push(sortedRaces[i]) }
                                
                            }
                                
                            
                        }
                        this.setState({ racesSortedByTimeInState: sortedByTimeArray })
                    }
                   
                    )
            }
            )
    }

    render() {

        return (
            <>
                <h5 style={{ textAlign: 'center', color: '#2c3d55', fontFamily: 'comfortaa, arial, san-serif' }}>By Distance and Time</h5>
                {this.state.racesSortedByTimeInState.map((currentRaceInLoop) => {
                    return (
                    <Card variant="info" style={{ width: '18rem', backgroundColor: '#0593b3'}}>
                        <Card.Body>
                            <Card.Title>{currentRaceInLoop.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{currentRaceInLoop.distance.name}
                            </Card.Subtitle>
                            <Card.Text>
                                {currentRaceInLoop.date} {currentRaceInLoop.location}  {currentRaceInLoop.netTime}
                            </Card.Text>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>)
                })}

            </>
        )
    }

}


export default DistanceOrderedByFastest