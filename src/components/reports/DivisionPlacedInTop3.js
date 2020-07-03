import React, { Component } from 'react'
import RaceManager from '../../modules/RaceManager'
//import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
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
                            //distancesInState: distancesFromAPI
                            // const result = words.filter(word => word.length > 6);
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
            )
                })}    

    render() {

        return (
            <>
                <h5 style={{ textAlign: 'center', color: '#2c3d55', fontFamily: 'comfortaa, arial, san-serif' }}>Races Division Placement in Top 3</h5>
                {this.state.top3InState.map((currentRaceInLoop) => {
                    return (
                        <Card variant="info" style={{ width: '18rem', backgroundColor: '#0593b3' }}>
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


export default DivisionPlaced