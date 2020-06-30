import React, { Component } from 'react';
//import { Link } from "react-router-dom"
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
//import NavDropdown from 'react-bootstrap/Dropdown'
import './NavBar.css'
import { Link } from 'react-router-dom';

class NavBar extends Component {
    isAuthenticated =() => localStorage.getItem("credentials")!== null;

    //The Method here clears the local storage.
    clearStorage = () => localStorage.clear();

    render() {
        return (
            <>
                    <Navbar style={{backgroundColor: '#209dc9'}}>
                    <Navbar.Brand style={{color: '#f3532b', fontSize:'30px', fontWeight: 'bold', textShadow: '2px 2px 5px black'}}  href="#home">Make A Run For It!</Navbar.Brand>
                    <Nav className="justify-content-end" activeKey="/home">
                        <Nav.Item style={{color: '#ebebeb'}}>
                        <Nav.Link ><Link style={{color:'#ebebeb'}} className="nav-link" to="/">Home</Link>
                        </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link><Link style={{color:'#ebebeb'}} className="nav-link" to="/races">Races</Link>
                        </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link><Link style={{color:'#ebebeb'}} className="nav-link" to="/">Reports</Link>
                        </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link><Link style={{color:'#ebebeb'}} className="nav-link" to="/" onClick={this.clearStorage}>Logout</Link>
                        </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Search</Button>
                    </Form> */}
                </Navbar>
            </>
        )
    }
}

export default NavBar;