// src/components/CandidateList.js
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

  return (
    <div>
      <h2>Candidate List</h2>
      {error && <p>{error}</p>}
      <ul>
        {candidates.map(candidate => (
          <li key={candidate.id}>
            <Link to={`/candidates/${candidate.id}`}>
              {candidate.name} - {candidate.currentStage}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;
