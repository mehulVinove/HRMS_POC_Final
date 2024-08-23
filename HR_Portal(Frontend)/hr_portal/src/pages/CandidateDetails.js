import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CandidateDetails = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [error, setError] = useState(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8082/api/candidates/${id}`)
      .then(response => {
        setCandidate(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the candidate details!', error);
        setError('Failed to fetch candidate details.');
      });
  }, [id]);

  const handleStageChange = (newStage) => {
    // Implement stage change logic here
  };

  const handleArchive = () => {
    // Implement archive logic here
  };

  const handleAddNote = () => {
    // Implement add note logic here
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!candidate) {
    return <p>Loading candidate details...</p>;
  }

  return (
    <div>
      <h2>{candidate.name}</h2>
      <p>Email: {candidate.email}</p>
      <p>Phone: {candidate.phoneNumber}</p>
      <p>Resume: <a href={candidate.resumePath} target="_blank" rel="noopener noreferrer">Download</a></p>
      <p>Current Stage: {candidate.currentStage}</p>

      <div>
        <h3>Manage Stages</h3>
        <button onClick={() => handleStageChange('NEXT_STAGE')}>Move to Next Stage</button>
        <button onClick={handleArchive}>Archive</button>
      </div>

      <div>
        <h3>Add Note</h3>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} />
        <button onClick={handleAddNote}>Add Note</button>
      </div>

      {/* Additional information and controls as needed */}
    </div>
  );
};

export default CandidateDetails;
