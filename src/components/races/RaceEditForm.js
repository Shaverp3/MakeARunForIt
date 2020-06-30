import React, { Component } from 'react';
import { Button, Col, Form, InputGroup } from 'react-bootstrap'
import './RaceForm.css'
//import RaceManager from '../../modules/RaceManager'
import DistanceManager from '../../modules/DistanceManager'

class RaceEditForm extends Component {
    //Sending in raceToEdit from RaceList
    state = {
        raceName: this.props.race.name,
        distanceId: this.props.race.distance.id,
        userId: JSON.parse(localStorage.getItem("credentials")).userId,
        raceDate: this.props.race.date,
        raceLocation: this.props.race.location,
        raceTemp: this.props.race.temperature,
        gunTime: this.props.race.gunTime,
        netTime: this.props.race.netTime,
        pace: this.props.race.pace,
        overallPlace: this.props.race.overallPlace,
        genderPlace: this.props.race.genderPlace,
        ageGenderPlace: this.props.race.ageGenderPlace,
        raceJournalEntry: this.props.race.journalEntry,
        loadingStatus: false,
        distances: []
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    // Function that collects edited object to be passed to handleUpdate function in RaceList
    // Main key of inline edit- actually edit whatever property of the existing object that is being passed in from RaceList
    makeEditedRace = () => {
        if (this.state.raceName === "") {
            window.alert("Please input a Race name");
        } else {
            const editedRace = {
                id: this.props.race.id,
                name: this.state.raceName,
                distanceId: parseInt(this.state.distanceId),
                userId: JSON.parse(localStorage.getItem("credentials")).userId,
                date: this.state.raceDate,
                location: this.state.raceLocation,
                temperature: this.state.raceTemp,
                gunTime: this.state.gunTime,
                netTime: this.state.netTime,
                pace: this.state.pace,
                overallPlace: this.state.overallPlace,
                genderPlace: this.state.genderPlace,
                ageGenderPlace: this.state.ageGenderPlace,
                journalEntry: this.state.raceJournalEntry
            };

            console.log(editedRace)
            this.props.handleUpdate(editedRace)
        }
    }

    //Need to change this to new fetch method to get expanded distanceId associated with this race I am editing
    componentDidMount() {
        console.log("RACE LIST: ComponentDidMount");
        DistanceManager.getAll()
            .then((distances) => {
                console.log("this is the distances array", distances)
                this.setState({
                    distances: distances
                })
            })
    }

    // Inline edit Form that appears on the TaskList page; pay attention to value and onClick functionality
    render() {
        return (
            <>
                <Form>
                    <Form.Row className="align-items-center">
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInput" column="sm" lg={2}>
                                Date:
                            </Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                id="inlineFormInput"
                                onChange={this.handleFieldChange}
                                value={this.state.raceDate}
                                onKeyDown={this.handleKeyDown}
                            />
                        </Col>
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInput" column="sm" lg={2}>
                                Race Name:
                            </Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                id="inlineFormInput"
                                onChange={this.handleFieldChange}
                                value={this.state.raceName}
                                onKeyDown={this.handleKeyDown}
                            />
                        </Col>
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInput" column="sm" lg={2}>
                                Location:
                        </Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                id="raceLocation"
                                onChange={this.handleFieldChange}
                                value={this.state.raceLocation}
                                onKeyDown={this.handleKeyDown}
                            />
                        </Col>
                        <Col xs="auto" className="my-1">
                            <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" column="sm" lg={2}>
                                Select Distance:
                            </Form.Label>
                            <Form.Control
                                as="select"
                                className="mr-sm-2"
                                size="sm"
                                id="distanceId"
                                value={this.state.distanceId}
                                onChange={this.handleFieldChange}
                            >
                                {this.state.distances.map(distance =>
                                    <option
                                        key={distance.id}
                                        value={distance.id}>{distance.name}
                                    </option>)}
                            </Form.Control>
                        </Col>
                        </Form.Row>
                        <Form.Row className="align-items-center">
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInput" column="sm" lg={2}>
                                Temp:
                        </Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                id="raceTemp"
                                onChange={this.handleFieldChange}
                                value={this.state.raceTemp}
                                onKeyDown={this.handleKeyDown}
                            />
                        </Col>
                        
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInput" column="sm" lg={2}>
                                Gun Time:
                        </Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                id="gunTime"
                                onChange={this.handleFieldChange}
                                value={this.state.gunTime}
                                onKeyDown={this.handleKeyDown}
                            />
                        </Col>
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInput" column="sm" lg={2}>
                                Net Time:
                        </Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                id="netTime"
                                onChange={this.handleFieldChange}
                                value={this.state.netTime}
                                onKeyDown={this.handleKeyDown}
                            />
                        </Col>
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInput" column="sm" lg={2}>
                                Pace:
                        </Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                id="pace"
                                onChange={this.handleFieldChange}
                                value={this.state.pace}
                                onKeyDown={this.handleKeyDown}
                            />
                        </Col>
                        </Form.Row>
                        <Form.Row className="align-items-center">
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInput" column="sm" lg={2}>
                                Overall Place:
                        </Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                id="overallPlace"
                                onChange={this.handleFieldChange}
                                value={this.state.overallPlace}
                                onKeyDown={this.handleKeyDown}
                            />
                        </Col>
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInput" column="sm" lg={2}>
                                Gender Place:
                        </Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                id="genderPlace"
                                onChange={this.handleFieldChange}
                                value={this.state.genderPlace}
                                onKeyDown={this.handleKeyDown}
                            />
                        </Col>
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInput" column="sm" lg={2}>
                                Division Place:
                        </Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                id="ageGenderPlace"
                                onChange={this.handleFieldChange}
                                value={this.state.ageGenderPlace}
                                onKeyDown={this.handleKeyDown}
                            />
                        </Col>
                        </Form.Row>
                        <Form.Row className="align-items-center">
                        <Col xs="auto">
                            <Form.Label htmlFor="inlineFormInput" column="sm" lg={2}>
                                Notes:
                        </Form.Label>
                            <Form.Control as="textarea"
                                size="sm"
                                rows="3"
                                id="raceJournalEntry"
                                onChange={this.handleFieldChange}
                                value={this.state.raceJournalEntry}
                                onKeyDown={this.handleKeyDown}
                            />
                        </Col>
                        </Form.Row>
                       
                        {/* <Col xs="auto">
                            <Button type="submit" className="mb-2">
                                Submit
                            </Button>
                        </Col> */}
                        <div className="button-row">
                            <Button className="cancel-btn"
                                variant="warning"
                                style={{ float: 'right', backgroundColor: '#0f6b8d', color: '#f3532b' }}
                                type="button"
                                size="sm"
                                onClick={() => this.props.editRace("")}>
                                Cancel
                            </Button>
                            <Button className="submit-btn"
                                variant="success"
                                style={{ float: 'right', backgroundColor: '#f3532b', color: '#0f6b8d', marginRight: '.5em' }}
                                type="submit"
                                size="sm"
                                onClick={() => this.makeEditedRace()}>
                                Save Changes
                            </Button>
                        </div>
                        </Form> 
            </>
        )
    }
}

export default RaceEditForm