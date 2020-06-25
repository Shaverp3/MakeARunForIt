import React, { Component } from 'react'
//import the components we will need
//import AnimalCard from './AnimalCard'
import RaceManager from '../../modules/RaceManager'
//import ResourceCard from "../reusables/ResourceCard"
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap'
//import Picker from 'react-mobile-picker';

class RaceList extends Component {
    //define what this component needs to render
    state = {
        racesInState: [],
        raceToEdit: null
    };

    deleteRace = id => {
        RaceManager.delete(id)
            .then(() => {
                RaceManager.getAll()
                    .then((newRaces) => {
                        this.setState({
                            racesInState: newRaces
                        })
                    })
            })
    };

    editRace = (id) => {
        this.setState({ raceToEdit: id })
        console.log(this.state.raceToEdit)

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
                        size="sm"
                        disabled={this.state.loadingStatus}
                        onClick={() => { this.props.history.push("/races/new") }}>
                        New Race
                    </Button>
                </section>
                <Accordion>
                    {this.state.racesInState.sort((a, b) => { return new Date(a.date) - new Date(b.date) }).map((currentRaceInLoop, i) => {
                        return currentRaceInLoop.id === this.state.raceToEdit ? (<Form> This is the Race I chose to Edit</Form>) : (
                            <Card style={{ backgroundColor: '#ebebeb', color: '#0593b3' }}   >
                                <Accordion.Toggle as={Card.Header} eventKey={i}>
                                    {currentRaceInLoop.date}  {currentRaceInLoop.name}  {currentRaceInLoop.location}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={i}>
                                    <Card.Body> Temp at race time: {currentRaceInLoop.temperature}  | Gun Time:{currentRaceInLoop.gunTime}  | Net Time: {currentRaceInLoop.netTime}  | Pace: {currentRaceInLoop.pace}  | Overall Place: {currentRaceInLoop.overallPlace}  | Gender Place: {currentRaceInLoop.genderPlace}  | Division Place: {currentRaceInLoop.ageGenderPlace}
                                        <Button variant="contained"
                                            style={{ float: 'right', backgroundColor: '#0f6b8d', color: '#f3532b' }}
                                            type="button"
                                            size="sm"
                                            disabled={this.state.loadingStatus}
                                            onClick={() => { this.deleteRace(currentRaceInLoop.id) }}>Delete
                                    </Button>
                                        <Button variant="contained"
                                            style={{ float: 'right', backgroundColor: '#f3532b', color: '#0f6b8d', marginRight: '.5em' }}
                                            type="button"
                                            size="sm"
                                            disabled={this.state.loadingStatus}
                                            onClick={() => { this.editRace(currentRaceInLoop.id) }}>Edit
                                    </Button>

                                    </Card.Body>
                                </Accordion.Collapse>

                        </Card>)}
                    )}
                    
                        </Accordion>
            </>)
    }}



export default RaceList