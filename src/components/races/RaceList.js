import React, { Component } from 'react'
import RaceManager from '../../modules/RaceManager'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import RaceEditForm from './RaceEditForm'
import DistanceManager from '../../modules/DistanceManager'
//import Picker from 'react-mobile-picker';
//Everything is done in this component - all details of races, editing of race, add new Race and delete race.

class RaceList extends Component {
    //define what this component needs to render
    state = {
        racesInState: [],
        raceToEdit: null,

        loadingStatus: false
    };

    deleteRace = id => {
        RaceManager.delete(id)
            .then(() => {
                RaceManager.getAll(JSON.parse(localStorage.getItem("credentials")).userId)
                    .then((newRaces) => {
                        this.setState({
                            racesInState: newRaces
                        })
                    })
            })
    };

    editRace = (id) => {
        this.setState({ raceToEdit: id })
    };

    updateExistingRace = editedRace => {
        // evt.preventDefault();

        this.setState({ loadingStatus: true });

        RaceManager.update(editedRace)
            .then(() => {
                RaceManager.getAll(JSON.parse(localStorage.getItem("credentials")).userId)
                    .then((racesFromAPI) => {
                        console.log(racesFromAPI)
                        this.setState({
                            racesInState: racesFromAPI,
                            raceToEdit: ""
                        })
                    })
            })
    };

    componentDidMount() {
        console.log("RACE LIST: ComponentDidMount");

        RaceManager.getAll(JSON.parse(localStorage.getItem("credentials")).userId)
            .then((racesFromAPI) => {
                console.log(racesFromAPI)
                this.setState({
                    racesInState: racesFromAPI
                })
            })

        DistanceManager.getAll()
            .then((distancesInAPI) => {
                console.log(distancesInAPI)
                this.setState({
                    distancesInState: distancesInAPI
                })
            })
    }

    render() {

        return (
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
                        return currentRaceInLoop.id !== this.state.raceToEdit ? (
                            <Card style={{ backgroundColor: '#ebebeb', color: '#0593b3' }}   >
                                <Accordion.Toggle as={Card.Header} eventKey={i}>
                                    {currentRaceInLoop.date}  {currentRaceInLoop.name}  {currentRaceInLoop.location}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey={i}>
                                    <Card.Body> Distance: {currentRaceInLoop.distance.name}  |
                                     Temp at race time: {currentRaceInLoop.temperature}  | Gun Time:{currentRaceInLoop.gunTime}  | Net Time: {currentRaceInLoop.netTime}  | Pace: {currentRaceInLoop.pace}  | Overall Place: {currentRaceInLoop.overallPlace}  | Gender Place: {currentRaceInLoop.genderPlace}  | Division Place: {currentRaceInLoop.ageGenderPlace} | Notes: {currentRaceInLoop.journalEntry}
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
                            </Card>) : (<RaceEditForm key={currentRaceInLoop.id} race={currentRaceInLoop} handleUpdate={this.updateExistingRace} editRace={this.editRace} />)
                    })
                    }
                </Accordion>
            </>)
    }

}

export default RaceList