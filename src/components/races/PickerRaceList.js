import React, { Component } from 'react'
//import the components we will need
//import AnimalCard from './AnimalCard'
import RaceManager from '../../modules/RaceManager'
//import ResourceCard from "../reusables/ResourceCard"
//import Accordion from 'react-bootstrap/Accordion'
//import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Picker from 'react-mobile-picker';


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
      
        // handleChange = (name, value) => {
        //   this.setState(({valueGroups}) => ({
        //     valueGroups: {
        //       ...valueGroups,
        //       [name]: value
        //     }
        //   }));
        // };
      
        render() {
          
          return (
              <>
          <Picker
                  style={{ backgroundColor: '#fafafa'}}
                  optionGroups={this.state.racesInState.map(currentRaceInLoop => {
                      return (<Item
                        valueGroups = {currentRaceInLoop.name}>
          </Picker>
                      )}
                      </>
                  )}}

export default RaceList