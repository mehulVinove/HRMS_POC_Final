import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import './MyNavbar.css';

const navbarStyle = {
  backgroundColor: '#4CAF50', // Set your desired background color
};


function MyNavbar() {
  return (
    <Navbar expand="lg"  bg="primary" data-bs-theme="dark" style={navbarStyle} className=" bg-body-tertiary bg-primary">
      <Container>
        <Navbar.Brand href="/">HRMS_portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/* <Nav.Link href="/employees">Employees</Nav.Link> */}



            <NavDropdown title="Employees" id="basic-nav-dropdown">
              <NavDropdown.Item href="/employees">
                Emp. List
              </NavDropdown.Item>
              <NavDropdown.Item href="/emp-status">
                Emp. Status
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link href="/projects">Projects</Nav.Link>
            <Nav.Link href="/candidates">Candidates</Nav.Link>

            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link className="btn btn-outline-light" to="/adduser">
            Add Candidate
          </Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;