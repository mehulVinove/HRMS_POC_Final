import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmployeeDetails = () => {
  const { id } = useParams(); // Get the employee ID from URL parameters
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/${id}`);
        setEmployee(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch employee details');
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='centered-text '>
      {employee ? (
        <div>
          <h2>Employee Details</h2>
          <p><strong>ID:</strong> {employee.id}</p>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Salary:</strong> {employee.salary}</p>
         
        </div>
      ) : (
        <p>No employee details available</p>
      )}
    </div>
  );
};

export default EmployeeDetails;
