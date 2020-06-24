import React, { Component } from 'react'
//import the components we will need
//import AnimalCard from './AnimalCard'
import RaceManager from '../../modules/RaceManager'
//import ResourceCard from "../reusables/ResourceCard"
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
class RaceList extends Component {
    //define what this component needs to render
    state = {
        racesInState: [],
    };

    componentDidMount() {
        console.log("RACE LIST: ComponentDidMount");
        //getAll from AnimalManager and hang on to that data; put it in state
        RaceManager.getAll()
            .then((racesFromAPI) => {
                console.log(racesFromAPI)
                this.setState({
                    racesInState: racesFromAPI
                })
            })
    }
    /*using .map instead of foreach*/
    render() {
        console.log("RACE LIST: Render");

        return (
            //add this button above your display of animal cards
            <>
                <section className="section-content">
                    <Button variant="primary"
                        style={{ backgroundColor: '#f3532b', color: '#0f6b8d' }}
                        type="submit"
                        disabled={this.state.loadingStatus}
                        onClick={() => { this.props.history.push("/races/new") }}>
                        Add Race
                    </Button>
                </section>
                <Accordion>
                    {this.state.racesInState.map(currentRaceInLoop => {
                        return (<Card style={{ backgroundColor: '#0593b3' }}>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                {currentRaceInLoop.date}  {currentRaceInLoop.name}  {currentRaceInLoop.location}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body> Temp at race time: {currentRaceInLoop.temperature}  | Gun Time:{currentRaceInLoop.gunTime}  | Net Time: {currentRaceInLoop.netTime}  | Pace: {currentRaceInLoop.pace}  | Overall Place: {currentRaceInLoop.overallPlace}  | Gender Place: {currentRaceInLoop.genderPlace}  | Division Place: {currentRaceInLoop.ageGenderPlace}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>)
                    }

                    )}
                </Accordion>
            </>

        )
    }
}


export default RaceList