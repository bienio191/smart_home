import React, { Component } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';


const Navigation = () => {
    return (

        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Smart Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#lights">Lights</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

export default Navigation;


//9xUtlSPAoUhmbEpx7ylwbkc2v6pYDvD9LNjFHS62