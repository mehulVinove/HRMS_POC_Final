//import logo from './logo.svg';
import './App.css';
import React, { Component,useState,useEffect } from 'react';
import EmployeeList from './components/EmployeeList'; 
import Employees from './pages/Employee';
import Home from './pages/Home';
import { Navigate, useNavigate } from 'react-router-dom';
import EmployeeDetails from './pages/EmployeeDetails';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';
import ProjectList from './components/ProjectList';
import ProjectDetails from './pages/ProjectDetails';
import Projects from './pages/Projects';
import Header from './components/common/Header';
import MyNavbar from './components/common/MyNavbar';
import CandidateDetails from './pages/CandidateDetails';
import AddUser from './pages/AddUser';
import CandidateList from './components/CandidateList';
import EditCandidate from './components/EditCandidate';
import AddEmployee from './components/AddEmployee';
import HRList from './pages/HRList';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(true);
    
    } else {
      setIsAuthenticated(false);
      navigate('/login'); 
       }
  }, [localStorage.getItem('token')]);

  return (
    <>
      {/* Conditionally render MyNavbar based on authentication */}
      {isAuthenticated && <MyNavbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />

        {/* Protect the following routes */}
        <Route path="/employees" element={isAuthenticated ? <EmployeeList /> : <Navigate to="/login" />} />
        <Route path="/employees/:id" element={isAuthenticated ? <EmployeeDetails /> : <Navigate to="/login" />} />
        <Route path="/projects" element={isAuthenticated ? <ProjectDetails /> : <Navigate to="/login" />} />
        <Route path="/projects/:id" element={isAuthenticated ? <ProjectDetails /> : <Navigate to="/login" />} />
        <Route path="/candidates" element={isAuthenticated ? <CandidateList /> : <Navigate to="/login" />} />
        <Route path="/candidates/:id" element={isAuthenticated ? <CandidateDetails /> : <Navigate to="/login" />} />
        <Route path="/adduser" element={isAuthenticated ? <AddUser /> : <Navigate to="/login" />} />
        <Route path="/candidates/edit/:id" element={isAuthenticated ? <EditCandidate /> : <Navigate to="/login" />} />
        <Route path="/add-employee" element={isAuthenticated ? <AddEmployee /> : <Navigate to="/login" />} />
        <Route path="/hr-list" element={isAuthenticated ? <HRList /> : <Navigate to="/login" />} />
      </Routes>
      </>
  );
};

export default App;