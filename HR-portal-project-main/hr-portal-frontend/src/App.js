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
import KanbanBoard from './components/KanbanBoard';
import AddUser from './pages/AddUser';
// function App() {
//   return (

//   <div className="App">
//     <h1>HR Portal</h1>
//     <EmployeeList />
//   </div>
//   );

// }

const App = () => (
  <Router>
    <MyNavbar />
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees" element={<EmployeeList />} />
      <Route path="/employees/:id" element={<EmployeeDetails />} />
      <Route path="/projects" element={<ProjectList />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/emp-status" component={KanbanBoard} />
      <Route path="/candidates/:id" element={<CandidateDetails />} />
      <Route  path="/adduser" element={<AddUser />} />
    </Routes>
  </Router>
);


export default App;
