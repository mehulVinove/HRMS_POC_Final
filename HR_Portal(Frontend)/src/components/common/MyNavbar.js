import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MyNavbar.css';
const navbarStyle = {
  backgroundColor: '#4CAF50', // Set your desired background color
};

function MyNavbar() {
  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark" style={navbarStyle} className="bg-body-tertiary bg-primary">
      <Container>
        <Navbar.Brand href="/">HRMS Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>

            {/* Employees Dropdown */}
            <NavDropdown title="Employees" id="basic-nav-dropdown">
              <NavDropdown.Item href="/add-employee">
                Add Employee
              </NavDropdown.Item>
              <NavDropdown.Item href="/employees">
                Emp. List
              </NavDropdown.Item>
            </NavDropdown>

            {/* Separate Projects Tab */}
            <Nav.Link href="/projects">Projects</Nav.Link>

            {/* Separate HR Tab */}
            <Nav.Link href="/hr-list">HR</Nav.Link>

            {/* Existing Recruit.(Hiring) Dropdown */}
            <NavDropdown title="Recruit.(Hiring)" id="basic-nav-dropdown">
              <NavDropdown.Item href="/adduser">Add Candidate</NavDropdown.Item>
              <NavDropdown.Item href="/candidates">View</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
