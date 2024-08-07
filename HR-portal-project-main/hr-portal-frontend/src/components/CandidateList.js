import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [interview1Status, setInterview1Status] = useState('');
  const [interview2Status, setInterview2Status] = useState('');
  const [status, setStatus] = useState('');

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

  const handleEditClick = (id, currentStatus, interview1Status, interview2Status) => {
    setEditId(id);
    setStatus(currentStatus);
    setInterview1Status(interview1Status);
    setInterview2Status(interview2Status);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleInterview1StatusChange = (e) => {
    setInterview1Status(e.target.value);
  };

  const handleInterview2StatusChange = (e) => {
    setInterview2Status(e.target.value);
  };

  const handleSave = (id) => {
    axios.put(`http://localhost:8082/api/candidates/${id}`, {
      status,
      interview1Status,
      interview2Status
    })
      .then(() => {
        setCandidates(candidates.map(candidate => 
          candidate.id === id ? { ...candidate, status, interview1Status, interview2Status } : candidate
        ));
        setEditId(null);
      })
      .catch(error => {
        console.error('There was an error updating the candidate!', error);
        setError('Failed to update candidate.');
      });
  };

  const handleDelete = (id) => {
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
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={candidate.id}>
              <th scope="row">{index + 1}</th>
              <td>{candidate.name}</td>
              <td>
                {editId === candidate.id ? (
                  <select
                    value={interview1Status}
                    onChange={handleInterview1StatusChange}
                    className="form-select"
                  >
                    <option value="Not Evaluated">Not Evaluated</option>
                    <option value="Cleared">Cleared</option>
                    <option value="Not Cleared">Not Cleared</option>
                  </select>
                ) : (
                  candidate.interview1Status
                )}
              </td>
              <td>
                {editId === candidate.id ? (
                  <select
                    value={interview2Status}
                    onChange={handleInterview2StatusChange}
                    className="form-select"
                  >
                    <option value="Not Evaluated">Not Evaluated</option>
                    <option value="Cleared">Cleared</option>
                    <option value="Not Cleared">Not Cleared</option>
                  </select>
                ) : (
                  candidate.interview2Status
                )}
              </td>
              <td>
                {editId === candidate.id ? (
                  <select
                    value={status}
                    onChange={handleStatusChange}
                    className="form-select"
                  >
                    <option value="Cleared">Cleared</option>
                    <option value="Not Cleared">Not Cleared</option>
                  </select>
                ) : (
                  candidate.status
                )}
              </td>
              <td>
                {editId === candidate.id ? (
                  <>
                    <button 
                      className="btn btn-success mx-2" 
                      onClick={() => handleSave(candidate.id)}>
                      Save
                    </button>
                    <button 
                      className="btn btn-secondary mx-2" 
                      onClick={() => setEditId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className="btn btn-primary mx-2" 
                      onClick={() => handleEditClick(candidate.id, candidate.status, candidate.interview1Status, candidate.interview2Status)}>
                      Edit
                    </button>
                    <button 
                      className="btn btn-danger mx-2" 
                      onClick={() => handleDelete(candidate.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;
