import React, { Component } from 'react';
import { Button, Container, Form } from 'react-bootstrap'
import './RaceForm.css'
import RaceManager from '../../modules/RaceManager'
import DistanceManager from '../../modules/DistanceManager'

class RaceEditForm extends Component {
    //Sending in raceToEdit from RaceList
    state = {
        raceName: this.props.race.name,
        distanceId: this.props.distanceId,
        userId: 1,
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
                distanceId: this.props.distanceId,
                userId: 1,
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
        //getDistanceId associated with current race that we're editing
        // RaceManager.getWithDistance(this.props.race.id)
        //     .then((distance) => {
        //         console.log(distance)
        //         this.setState({
            //
            //   this is where I need to get just one id and set it
        //             distances: distance 
        //         })
        //     })
    

    DistanceManager.getAll()
            .then((distances) => {
                console.log(distances)
                this.setState({
                    distances: distances
                })
            })
    }


    
    // Inline edit Form that appears on the TaskList page; pay attention to value and onClick functionality
    render() {

        return (
            <>
                <Container className="inline-edit-form"><br />
                    <Form >
                        <Form.Group>
                            <Form.Label>Race Name: </Form.Label>
                            <Form.Control type="text" id="raceName" required
                                onChange={this.handleFieldChange} value={this.state.raceName} onKeyDown={this.handleKeyDown} />
                        </Form.Group>
                        <Form.Group>
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
                        <Form.Group>
                            <Form.Label>Date: </Form.Label>
                            <Form.Control type="text" id="raceDate"
                                onChange={this.handleFieldChange} value={this.state.raceDate} onKeyDown={this.handleKeyDown} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Location: </Form.Label>
                            <Form.Control type="text" id="raceLocation"
                                onChange={this.handleFieldChange} value={this.state.raceLocation} onKeyDown={this.handleKeyDown} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Temperature:</Form.Label>
                            <Form.Control type="text" id="raceTemp"
                                onChange={this.handleFieldChange} value={this.state.raceTemp} onKeyDown={this.handleKeyDown} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Gun Time: </Form.Label>
                            <Form.Control type="text" id="gunTime"
                                onChange={this.handleFieldChange} value={this.state.gunTime} onKeyDown={this.handleKeyDown} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Net Time: </Form.Label>
                            <Form.Control type="text" id="netTime" onChange={this.handleFieldChange} value={this.state.netTime}
                                onKeyDown={this.handleKeyDown} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Pace:</Form.Label>
                            <Form.Control type="text" id="pace"
                                onChange={this.handleFieldChange} value={this.state.pace} onKeyDown={this.handleKeyDown} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Overall Place: </Form.Label>
                            <Form.Control type="text" id="overallPlace"
                                onChange={this.handleFieldChange} value={this.state.overallPlace} onKeyDown={this.handleKeyDown} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Gender Place: </Form.Label>
                            <Form.Control type="text" id="genderPlace"
                                onChange={this.handleFieldChange} value={this.state.genderPlace} onKeyDown={this.handleKeyDown} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Age/Gender Place: </Form.Label>
                            <Form.Control type="text" id="ageGenderPlace"
                                onChange={this.handleFieldChange} value={this.state.ageGenderPlace} onKeyDown={this.handleKeyDown} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Notes: </Form.Label>
                            <Form.Control type="text" id="raceJournalEntry"
                                onChange={this.handleFieldChange} value={this.state.raceJournalEntry} onKeyDown={this.handleKeyDown} />
                        </Form.Group>
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
                </Container>
            </>
        )
    }
}

export default RaceEditForm