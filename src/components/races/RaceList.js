import React, { Component } from 'react'
//import the components we will need
//import AnimalCard from './AnimalCard'
import RaceManager from '../../modules/RaceManager'
import ResourceCard from "../reusables/ResourceCard"
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

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
                    <button type="button"
                        className="btn"
                        onClick={() => { this.props.history.push("/races/new") }}>
                        Add Race
                    </button>
                </section>

                {/* <div className="container-cards">
                    {this.state.racesInState.map(currentRaceInLoop => {
                        return <ResourceCard
                        key={currentRaceInLoop.id}
                        resource={currentRaceInLoop}
                        resourceName="races"
                        //deleteAnimal={this.deleteAnimal}
                    />
                })}
                </div> */}
                

                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                        {this.state.racesInState.map(currentRaceInLoop => {
                        return <ResourceCard
                        key={currentRaceInLoop.id}
                        resource={currentRaceInLoop.name}
                        resourceName="races"</Accordion.Toggle>
                        
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>Hello! I'm the body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            Click me!
                    </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>Hello! I'm another body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </>
        )
    }
}

export default RaceList