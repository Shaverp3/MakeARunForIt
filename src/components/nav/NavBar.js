import React, { Component } from 'react';
//import { Link } from "react-router-dom"
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
//import NavDropdown from 'react-bootstrap/Dropdown'
import './NavBar.css'
import { Link } from 'react-router-dom';

class NavBar extends Component {

    render() {
        return (
            <>
                    <Navbar style={{backgroundColor: '#209dc9'}}>
                    <Navbar.Brand style={{color: '#f3532b'}}  href="#home">Make A Run For It!</Navbar.Brand>
                    <Nav className="justify-content-end" activeKey="/home">
                        <Nav.Item style={{color: '#ebebeb'}}>
                        <Nav.Link ><Link className="nav-link" to="/">Home</Link>
                        </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link><Link className="nav-link" to="/races">Races</Link>
                        </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link><Link className="nav-link" to="/">Reports</Link>
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