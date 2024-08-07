// src/components/EditCandidate.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCandidate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState({
    name: '',
    interview1Status: '',
    interview2Status: '',
    status: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8082/api/candidates/${id}`)
      .then(response => {
        setCandidate(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the candidate!', error);
        setError('Failed to fetch candidate.');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate({
      ...candidate,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8082/api/candidates/${id}`, candidate)
      .then(() => {
        navigate('/candidates');
      })
      .catch(error => {
        console.error('There was an error updating the candidate!', error);
        setError('Failed to update candidate.');
      });
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Edit Candidate</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={candidate.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Interview 1 Status</label>
          <input
            type="text"
            name="interview1Status"
            value={candidate.interview1Status}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Interview 2 Status</label>
          <input
            type="text"
            name="interview2Status"
            value={candidate.interview2Status}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <input
            type="text"
            name="status"
            value={candidate.status}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Save</button>
      </form>
    </div>
  );
};

export default EditCandidate;
