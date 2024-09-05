import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddHR = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (event) => {
    event.preventDefault();

    // Retrieve the token from localStorage
    const token = JSON.parse(localStorage.getItem('token'));

    if (!token || !token.data || !token.data.accessToken) {
      setError('Token is missing or invalid');
      return;
    }

    // Create the HR data object
    const hrData = {
      name,
      email,
    };

    // Determine the endpoint based on user role
    const endpoint = 'http://localhost:8082/api/admin/hr'; // Admin endpoint for adding HR

    axios.post(endpoint, hrData, {
      headers: {
        'Authorization': `Bearer ${token.data.accessToken}`, // Add the token to the Authorization header
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      // Handle successful response
      navigate('/hr-list'); // Redirect to HR list page after successful submission
    })
    .catch(error => {
      console.error('There was an error adding the HR data!', error);
      if (error.response && error.response.status === 403) {
        setError('Access denied. You do not have permission to perform this action.');
      } else {
        setError('Failed to add HR data.');
      }
    });
  };

  return (
    <div>
      <h2>Add HR</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add HR</button>
      </form>
    </div>
  );
};

export default AddHR;
