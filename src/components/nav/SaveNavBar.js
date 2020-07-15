<Navbar style={{ backgroundColor: '#209dc9' }}>
                    <Navbar.Brand style={{ color: '#f3532b', fontSize: '30px', fontWeight: 'bold', textShadow: '2px 2px 5px black' }} href="#home">Make A Run For It!</Navbar.Brand>
                    <Nav className="justify-content-end" activeKey="/home">
                        <Nav.Item style={{ color: '#ebebeb' }}>
                            <Nav.Link ><Link style={{ color: '#ebebeb' }} className="nav-link" to="/">Home</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link><Link style={{ color: '#ebebeb' }} className="nav-link" to="/races">Races</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={{ color: '#ebebeb' }}>
                            <NavDropdown title="Reports" id="collapsible-nav-dropdown">
                                <NavDropdown.Item><Link style={{ color: '#209dc9' }} className="nav-link" to="/reports/PersonalBest">Personal Best By Distance</Link></NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Item>
                        {/* <Nav.Link><Link style={{color:'#ebebeb'}} className="nav-link" to="/reports">Reports</Link>
                        </Nav.Link>
                        </Nav.Item> */}
                        <Nav.Item>
                            <Nav.Link><Link style={{ color: '#ebebeb' }} className="nav-link" to="/" onClick={this.clearStorage}>Logout</Link>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Search</Button>
                    </Form> */}
                </Navbar>