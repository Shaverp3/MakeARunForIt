import React, { Component } from 'react';
import RaceManager from '../../modules/RaceManager';
import Form from 'react-bootstrap/Form'
import { Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import './RaceForm.css'
import DistanceManager from '../../modules/DistanceManager';

class RaceForm extends Component {
    state = {
        raceName: "",
        distanceId: {},
        raceDate: "",
        raceLocation: "",
        raceTemperature: "",
        gunTime: "",
        netTime: "",
        pace: "",
        overallPlace: "",
        genderPlace: "",
        ageGenderPlace: "",
        raceJournalEntry: "",
        loadingStatus: false,
        distances: []
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    /*  Local method for validation, set loadingStatus, create animal      object, invoke the AnimalManager post method, and redirect to the full animal list
    */
    constructNewRace = evt => {
        evt.preventDefault();
        if (this.state.raceName === "") {
            window.alert("Please input a race name");
        } else {
            this.setState({ loadingStatus: true });
            const newRace = {
                name: this.state.raceName,
                distanceId: this.state.distanceId,
                date: this.state.raceDate,
                location: this.state.raceLocation,
                temperature: this.state.raceTemperature,
                gunTime: this.state.gunTime,
                netTime: this.state.netTime,
                pace: this.state.pace,
                overallPlace: this.state.overallPlace,
                genderPlace: this.state.genderPlace,
                ageGenderPlace: this.state.ageGenderPlace,
                journalEntry: this.state.raceJournalEntry
            };

            // Create the animal and redirect user to animal list
            RaceManager.post(newRace)
                .then(() => this.props.history.push("/races"));
        }

    }

    componentDidMount() {
        console.log("RACE LIST: ComponentDidMount");
        //getAll from EmployeeManager and hang on to that data; put it in state
        DistanceManager.getAll()
            .then((distances) => {
                console.log(distances)
                this.setState({
                    distances: distances
                })
            })
    }

    render() {

        return (
            <>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridRaceName">
                            <Form.Label> Name:</Form.Label>
                            <Form.Control
                                size="sm"
                                className="mb-2 mr-sm-2"
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="raceName"
                                placeholder="Race name"
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridDistance">
                            <Form.Label>Select Distance:</Form.Label>
                           
                            <select
                                size="sm"
                                className="form-control"
                                id="distanceId"
                                value={this.state.distanceId}
                                onChange={this.handleFieldChange}
                            >
                                {this.state.distances.map(distance =>
                                    <option
                                        key={distance.id}
                                        value={distance.id}>{distance.name}
                                    </option>
                                )}
                            </select>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridRaceDate">
                            <Form.Label>Date:</Form.Label>
                            <Form.Control
                                size="sm"
                                className="mb-2 mr-sm-2"
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="raceDate"
                                placeholder="Date"
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLocation">
                            <Form.Label>Location:</Form.Label>
                            <Form.Control
                                size="sm"
                                className="mb-2 mr-sm-2"
                                type="text"
                                onChange={this.handleFieldChange}
                                id="raceLocation"
                                placeholder="Location"
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridTemp">
                            <Form.Label>Temperature:</Form.Label>
                            <Form.Control
                                size="sm"
                                className="mb-2 mr-sm-2"
                                type="text"
                                onChange={this.handleFieldChange}
                                id="raceTemperature"
                                placeholder="Temp at Race Time"
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridGunTime">
                            <Form.Label>Gun Time:</Form.Label>
                            <Form.Control
                                size="sm"
                                className="mb-2 mr-sm-2"
                                type="text"
                                onChange={this.handleFieldChange}
                                id="gunTime"
                                placeholder="Gun Time"
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridNetTime">
                            <Form.Label>Net Time:</Form.Label>
                            <Form.Control
                                size="sm"
                                className="mb-2 mr-sm-2"
                                type="text"
                                onChange={this.handleFieldChange}
                                id="netTime"
                                placeholder="Net Time"
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPace">
                            <Form.Label>Pace:</Form.Label>
                            <Form.Control
                                size="sm"
                                className="mb-2 mr-sm-2"
                                type="text"
                                onChange={this.handleFieldChange}
                                id="pace"
                                placeholder="Pace"
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridOverall">
                            <Form.Label>Overall Place:</Form.Label>
                            <Form.Control
                                size="sm"
                                className="mb-2 mr-sm-2"
                                type="text"
                                onChange={this.handleFieldChange}
                                id="overallPlace"
                                placeholder="Place Overall"
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridGender">
                            <Form.Label>Gender Place:</Form.Label>
                            <Form.Control
                                size="sm"
                                className="mb-2 mr-sm-2"
                                type="text"
                                onChange={this.handleFieldChange}
                                id="genderPlace"
                                placeholder="GenderPlace"
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridAgeGender">
                            <Form.Label>Age/Gender Place:</Form.Label>
                            <Form.Control
                                size="sm"
                                className="mb-2 mr-sm-2"
                                type="text"
                                onChange={this.handleFieldChange}
                                id="ageGenderPlace"
                                placeholder="AgeGenderPlace"
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridJournalEntry">
                            <Form.Label>Race Journal:</Form.Label>
                            <Form.Control
                                size="sm"
                                className="mb-2 mr-sm-2"
                                type="textarea"
                                onChange={this.handleFieldChange}
                                id="raceJournalEntry"
                                placeholder=""
                            />
                        </Form.Group>
                    </Form.Row>
                    <div className="alignRight">
                        <Button variant="primary"

                            style={{ backgroundColor: '#f3532b', color: '#0f6b8d' }}
                            type="submit"
                            disabled={this.state.loadingStatus}
                            onClick={this.constructNewRace}
                        >Submit</Button>
                    </div>
                </Form>

            </>
        )
    }
}

export default RaceForm