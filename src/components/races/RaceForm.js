import React, { Component } from 'react';
import RaceManager from '../../modules/RaceManager';
import './RaceForm.css'
import DistanceManager from '../../modules/DistanceManager';

class RaceForm extends Component {
    state = {
        raceName: "",
        distanceId: {},
        raceDate: "",
        raceLocation: "",
        raceTemperature:"",
        gunTime:"",
        netTime:"",
        pace:"",
        overallPlace:"",
        genderPlace:"",
        ageGroupPlace:"",        
        loadingStatus: false,
        distances:[]
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
                distanceId: parseInt(this.state.distanceId),
                date: this.state.raceDate,
                location: this.state.raceLocation,
                temperature: this.state.raceTemperature,
                gunTime: this.state.gunTime,
                netTime: this.state.netTime,
                pace: this.state.pace,
                overallPlace: this.state.overallPlace,
                genderPlace: this.state.genderPlace,
                ageGroupPlace: this.state.ageGroupPlace
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
                <form>
                    <fieldset>
                        <div className="formgrid">
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="raceName"
                                placeholder="Race name"
                            />
                            <label htmlFor="raceName">Name:</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="raceDate"
                                placeholder="Date"
                            />
                            <label htmlFor="raceDate">Date:</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="raceLocation"
                                placeholder="Location"
                            />
                            <label htmlFor="raceLocation">Location:</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="raceTemperature"
                                placeholder="Temp"
                            />
                            <label htmlFor="raceTemperature">Temperature:</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="gunTime"
                                placeholder="GunTime"
                            />
                            <label htmlFor="gunTime">Gun Time:</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="netTime"
                                placeholder="NetTime"
                            />
                            <label htmlFor="netTime">Net Time:</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="Pace"
                                placeholder="Pace"
                            />
                            <label htmlFor="raceDate">Pace:</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="overallPlace"
                                placeholder="Place Overall"
                            />
                            <label htmlFor="overallPlace">Place Overall:</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="genderPlace"
                                placeholder="GenderPlace"
                            />
                            <label htmlFor="genderPlace">Gender Place</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="ageGenderPlace"
                                placeholder="AgeGenderPlace"
                            />
                            <label htmlFor="ageGenderPlace">Age/Gender Place</label>
                        </div>
                        <label htmlFor="distanceId">Select Race Distance:</label>
                            <select
                                className="form-control"
                                id="distanceId"
                                value={this.state.distanceId}
                                onChange={this.handleFieldChange}
                            >
                                {this.state.distances.map(distance =>
                                    <option key={distance.id} value={distance.id}>
                                        {distance.name}
                                    </option>
                                )}
                            </select>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.constructNewRace}
                            >Add Race</button>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }
}

export default RaceForm