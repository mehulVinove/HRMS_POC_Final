import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BackgroundVideo.css'; 
import './EmployeeList.css';


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = JSON.parse(localStorage.getItem('token'));
    console.log('Token:', token); // Debugging: Check token retrieval

    if (!token || !token.data.accessToken) {
      setError('Token is missing or invalid');
      return;
    }

    // Extract the user role from the token object directly
    const getUserRole = (token) => {
      try {
        if (token.data && token.data.roles && token.data.roles.length > 0) {
          // Access the roles array and get the first role
          return token.data.roles[0]; // Use the role directly from data.roles array
        }
      } catch (error) {
        console.error('Error getting user role:', error); // Debugging: Log role extraction errors
        return null;
      }
    };

    const userRole = getUserRole(token);
    console.log('User role:', userRole); // Debugging: Log user role

    // Determine the endpoint based on user role
    const endpoint = 
      userRole === 'ROLE_ADMIN' ? 'http://localhost:8082/api/admin/employees' :
      userRole === 'ROLE_HR' ? 'http://localhost:8082/api/hr/employees' : null;

    if (!endpoint) {
      setError('Invalid user role or unauthorized access');
      return;
    }

    // Make the API call with the correct endpoint
    axios.get(endpoint, {
        headers: {
          'Authorization': `Bearer ${token.data.accessToken}`  // Add the token to the Authorization header
        }
      })
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
    
      <h2>Employee List</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>S.N</th>
              <th>Name</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id}>
                <td>{index + 1}</td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.salary}</td>
                <td>
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;