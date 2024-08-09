import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BackgroundVideo.css'; 
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8082/api/')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the employees!', error);
        setError('Failed to fetch employees.');
      });
  }, []);

  return (
    <div className='centered-text background'>
         <video autoPlay loop muted className="video">
        <source src="/videos/video-1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> 
      <h2>Employee List</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            {employee.name} - {employee.position} - {employee.salary}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
