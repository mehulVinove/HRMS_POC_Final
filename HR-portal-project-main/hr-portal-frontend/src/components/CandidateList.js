import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8082/api/candidates')
      .then(response => {
        setCandidates(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the candidates!', error);
        setError('Failed to fetch candidates.');
      });
  }, []);

  const handleDelete = (id) => {
    // Implement delete logic here
    axios.delete(`http://localhost:8082/api/candidates/${id}`)
      .then(() => {
        setCandidates(candidates.filter(candidate => candidate.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the candidate!', error);
        setError('Failed to delete candidate.');
      });
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Candidate List</h2>
      {error && <p className="text-danger">{error}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">S.N</th>
            <th scope="col">Name</th>
            <th scope="col">Interview 1</th>
            <th scope="col">Interview 2</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={candidate.id}>
              <th scope="row">{index + 1}</th>
              <td>{candidate.name}</td>
              <td>{candidate.username}</td>
              <td>{candidate.email}</td>
              <td>
                <Link to={`/candidates/${candidate.id}`} className="btn btn-primary mx-2">
                  View
                </Link>
                <Link to={`/candidates/edit/${candidate.id}`} className="btn btn-outline-primary mx-2">
                  Edit
                </Link>
                <button 
                  className="btn btn-danger mx-2" 
                  onClick={() => handleDelete(candidate.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;
