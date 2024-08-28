import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import React, { Component,useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyNavbar.css';
import { useNavigate } from 'react-router-dom';
const navbarStyle = {
  backgroundColor: '#4CAF50', // Set your desired background color
};

function MyNavbar() {
  const [userRole, setUserRole] = useState(null); // State for user role
  const [error, setError] = useState(null); // State for any potential error
  const navigate = useNavigate(); 

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = JSON.parse(localStorage.getItem('token'));
    console.log('Token:', token); // Debugging: Check token retrieval

    if (!token || !token.data || !token.data.accessToken) {
      setError('Token is missing or invalid');
      return;
    }

    // Extract the user role from the token object
    const getUserRole = (token) => {
      try {
        if (token.data && token.data.roles && token.data.roles.length > 0) {
          return token.data.roles[0]; // Use the first role directly from data.roles array
        }
      } catch (error) {
        console.error('Error getting user role:', error); // Log role extraction errors
        return null;
      }
    };

    const role = getUserRole(token);
    console.log('User role:', role); 
    setUserRole(role); // Set the retrieved user role to state

  }, []); // Empty dependency array to run only once on component mount
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark" style={navbarStyle} className="bg-body-tertiary bg-primary">
      <Container>
        <Navbar.Brand href="/home">HRMS Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
          
            {/* Conditionally render for ADMIN */}
            {userRole === 'ROLE_ADMIN' && (
              <>
                {/* Employees Dropdown */}
                <NavDropdown title="Employees" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/add-employee">Add Employee</NavDropdown.Item>
                  <NavDropdown.Item href="/employees">Emp. List</NavDropdown.Item>
                </NavDropdown>

                {/* Projects Tab */}
                <Nav.Link href="/projects">Projects</Nav.Link>

                {/* HR Tab */}
                <Nav.Link href="/hr-list">HR</Nav.Link>
                 {/* Existing Recruit.(Hiring) Dropdown */}
                 <NavDropdown title="Recruit.(Hiring)" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/adduser">Add Candidate</NavDropdown.Item>
                  <NavDropdown.Item href="/candidates">View</NavDropdown.Item>
                </NavDropdown>
              </>
            )}

            {/* Conditionally render for HR */}
            {userRole === 'ROLE_HR' && (
              <>
              <NavDropdown title="Employees" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/add-employee">Add Employee</NavDropdown.Item>
                  <NavDropdown.Item href="/employees">Emp. List</NavDropdown.Item>
                </NavDropdown>
                {/* Existing Recruit.(Hiring) Dropdown */}
                <NavDropdown title="Recruit.(Hiring)" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/adduser">Add Candidate</NavDropdown.Item>
                  <NavDropdown.Item href="/candidates">View</NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
           {/* Logout Button */}
           <Nav className="ml-auto">
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;