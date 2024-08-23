// src/components/EmployeeForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EmployeeForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8082/api/employees', { name })
      .then(response => console.log('Employee added!', response))
      .catch(error => console.error('There was an error adding the employee!', error));
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Employee Name"
          required
        />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
