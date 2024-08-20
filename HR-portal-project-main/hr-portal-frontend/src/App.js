//import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';
import EmployeeList from './components/EmployeeList'; 
import Employees from './pages/Employee';
import Home from './pages/Home';
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

const App = () => (
  <Router>
    <MyNavbar />
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<EmployeeList />} />
      <Route path="/employees/:id" element={<EmployeeDetails />} />
      <Route path="/projects" element={<ProjectList />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/candidates" element={<CandidateList />} />
      <Route path="/candidates/:id" element={<CandidateDetails />} />
      <Route  path="/adduser" element={<AddUser />} />
      <Route path="/candidates/edit/:id" component={EditCandidate} />
      <Route path="/add-employee" element={<AddEmployee />} />
      <Route path="/hr-list" element={<HRList />} /> 

      
    </Routes>
  </Router>
);


export default App;
