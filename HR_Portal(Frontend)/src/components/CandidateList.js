
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CandidateList = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [error, setError] = useState(null);
//   const [editId, setEditId] = useState(null);
//   const [interview1Status, setInterview1Status] = useState('');
//   const [interview2Status, setInterview2Status] = useState('');
//   const [status, setStatus] = useState('');

//   useEffect(() => {
//     const token = JSON.parse(localStorage.getItem('token'));
//     console.log('Token:', token); // Debugging: Check token retrieval

//     if (!token || !token.data || !token.data.accessToken) {
//       setError('Token is missing or invalid');
//       return;
//     }

//     const getUserRole = (token) => {
//       try {
//         if (token.data && token.data.roles && token.data.roles.length > 0) {
//           return token.data.roles[0]; // Use the role directly from data.roles array
//         }
//       } catch (error) {
//         console.error('Error getting user role:', error);
//         return null;
//       }
//     };

//     const userRole = getUserRole(token);
//     console.log('User role:', userRole);

//     const endpoint =
//       userRole === 'ROLE_ADMIN' ? 'http://localhost:8082/api/admin/candidates' :
//       userRole === 'ROLE_HR' ? 'http://localhost:8082/api/hr/candidates' : null;

//     if (!endpoint) {
//       setError('Invalid user role or unauthorized access');
//       return;
//     }

//     axios.get(endpoint, {
//       headers: {
//         'Authorization': `Bearer ${token.data.accessToken}` // Add the token to the Authorization header
//       }
//     })
//     .then(response => {
//       setCandidates(response.data);
//     })
//     .catch(error => {
//       console.error('There was an error fetching the candidates!', error);
//       if (error.response && error.response.status === 403) {
//         setError('Access denied. You do not have permission to view this resource.');
//       } else {
//         setError('Failed to fetch candidates.');
//       }
//     });
//   }, []);

//   const handleEditClick = (id, currentStatus, interview1Status, interview2Status) => {
//     setEditId(id);
//     setStatus(currentStatus);
//     setInterview1Status(interview1Status);
//     setInterview2Status(interview2Status);
//   };

//   const handleStatusChange = (e) => {
//     setStatus(e.target.value);
//   };

//   const handleInterview1StatusChange = (e) => {
//     setInterview1Status(e.target.value);
//   };

//   const handleInterview2StatusChange = (e) => {
//     setInterview2Status(e.target.value);
//   };

//   const handleSave = (id) => {
//     const token = JSON.parse(localStorage.getItem('token'));
//     axios.put(`http://localhost:8082/api/admin/candidates/${id}`, {
//       status,
//       interview1Status,
//       interview2Status
//     }, {
//       headers: {
//         'Authorization': `Bearer ${token.data.accessToken}` // Add the token to the Authorization header
//       }
//     })
//     .then(() => {
//       setCandidates(candidates.map(candidate => 
//         candidate.id === id ? { ...candidate, status, interview1Status, interview2Status } : candidate
//       ));
//       setEditId(null);
//     })
//     .catch(error => {
//       console.error('There was an error updating the candidate!', error);
//       setError('Failed to update candidate.');
//     });
//   };

//   const handleDelete = (id) => {
//     const token = JSON.parse(localStorage.getItem('token'));
  
//     if (!token || !token.data || !token.data.accessToken) {
//       setError('Token is missing or invalid');
//       return;
//     }
  
//     const userRole = getUserRole(token);
//     const endpoint =
//       userRole === 'ROLE_ADMIN' ? `http://localhost:8082/api/admin/candidates/${id}` :
//       userRole === 'ROLE_HR' ? `http://localhost:8082/api/hr/candidates/${id}` : null;
  
//     if (!endpoint) {
//       setError('Invalid user role or unauthorized access');
//       return;
//     }
  
//     axios.delete(endpoint, {
//       headers: {
//         'Authorization': `Bearer ${token.data.accessToken}`
//       }
//     })
//     .then(() => {
//       setCandidates(candidates.filter(candidate => candidate.id !== id));
//     })
//     .catch(error => {
//       console.error('There was an error deleting the candidate!', error);
//       if (error.response && error.response.status === 403) {
//         setError('Access denied. You do not have permission to delete this candidate.');
//       } else {
//         setError('Failed to delete candidate.');
//       }
//     });
//   };
  
//   // Function to get user role from the token
//   const getUserRole = (token) => {
//     try {
//       if (token.data && token.data.roles && token.data.roles.length > 0) {
//         return token.data.roles[0]; // Use the role directly from data.roles array
//       }
//     } catch (error) {
//       console.error('Error getting user role:', error);
//       return null;
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="text-center my-4">Candidate List</h2>
//       {error && <p className="text-danger">{error}</p>}
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th scope="col">S.N</th>
//             <th scope="col">Name</th>
//             <th scope="col">Interview 1</th>
//             <th scope="col">Interview 2</th>
//             <th scope="col">Status</th>
//             <th scope="col">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {candidates.map((candidate, index) => (
//             <tr key={candidate.id}>
//               <th scope="row">{index + 1}</th>
//               <td>{candidate.name}</td>
//               <td>
//                 {editId === candidate.id ? (
//                   <select
//                     value={interview1Status}
//                     onChange={handleInterview1StatusChange}
//                     className="form-select"
//                   >
//                     <option value="Not Evaluated">Not Evaluated</option>
//                     <option value="Cleared">Cleared</option>
//                     <option value="Not Cleared">Not Cleared</option>
//                   </select>
//                 ) : (
//                   candidate.interview1Status
//                 )}
//               </td>
//               <td>
//                 {editId === candidate.id ? (
//                   <select
//                     value={interview2Status}
//                     onChange={handleInterview2StatusChange}
//                     className="form-select"
//                   >
//                     <option value="Not Evaluated">Not Evaluated</option>
//                     <option value="Cleared">Cleared</option>
//                     <option value="Not Cleared">Not Cleared</option>
//                   </select>
//                 ) : (
//                   candidate.interview2Status
//                 )}
//               </td>
//               <td>
//                 {editId === candidate.id ? (
//                   <select
//                     value={status}
//                     onChange={handleStatusChange}
//                     className="form-select"
//                   >
//                     <option value="Cleared">Cleared</option>
//                     <option value="Not Cleared">Not Cleared</option>
//                   </select>
//                 ) : (
//                   candidate.status
//                 )}
//               </td>
//               <td>
//                 {editId === candidate.id ? (
//                   <>
//                     <button 
//                       className="btn btn-success mx-2" 
//                       onClick={() => handleSave(candidate.id)}>
//                       Save
//                     </button>
//                     <button 
//                       className="btn btn-secondary mx-2" 
//                       onClick={() => setEditId(null)}>
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button 
//                       className="btn btn-primary mx-2" 
//                       onClick={() => handleEditClick(candidate.id, candidate.status, candidate.interview1Status, candidate.interview2Status)}>
//                       Edit
//                     </button>
//                     <button 
//                       className="btn btn-danger mx-2" 
//                       onClick={() => handleDelete(candidate.id)}>
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CandidateList;
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
    const token = JSON.parse(localStorage.getItem('token'));
    console.log('Token:', token); // Debugging: Check token retrieval

    if (!token || !token.data || !token.data.accessToken) {
      setError('Token is missing or invalid');
      return;
    }

    const getUserRole = (token) => {
      try {
        if (token.data && token.data.roles && token.data.roles.length > 0) {
          return token.data.roles[0]; // Use the role directly from data.roles array
        }
      } catch (error) {
        console.error('Error getting user role:', error);
        return null;
      }
    };

    const userRole = getUserRole(token);
    console.log('User role:', userRole);

    const endpoint =
      userRole === 'ROLE_ADMIN' ? 'http://localhost:8082/api/admin/candidates' :
      userRole === 'ROLE_HR' ? 'http://localhost:8082/api/hr/candidates' : null;

    if (!endpoint) {
      setError('Invalid user role or unauthorized access');
      return;
    }

    axios.get(endpoint, {
      headers: {
        'Authorization': `Bearer ${token.data.accessToken}` // Add the token to the Authorization header
      }
    })
    .then(response => {
      setCandidates(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the candidates!', error);
      if (error.response && error.response.status === 403) {
        setError('Access denied. You do not have permission to view this resource.');
      } else {
        setError('Failed to fetch candidates.');
      }
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
    const token = JSON.parse(localStorage.getItem('token'));
    axios.put(`http://localhost:8082/api/admin/candidates/${id}`, {
      status,
      interview1Status,
      interview2Status
    }, {
      headers: {
        'Authorization': `Bearer ${token.data.accessToken}` // Add the token to the Authorization header
      }
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
    const token = JSON.parse(localStorage.getItem('token'));
  
    if (!token || !token.data || !token.data.accessToken) {
      setError('Token is missing or invalid');
      return;
    }

    // Ensure we get the correct user role and endpoint
    const userRole = getUserRole(token);
    const endpoint =
      userRole === 'ROLE_ADMIN' ? `http://localhost:8082/api/admin/candidates/${id}` :
      userRole === 'ROLE_HR' ? `http://localhost:8082/api/hr/candidates/${id}` : null;

    if (!endpoint) {
      setError('Invalid user role or unauthorized access');
      return;
    }

    axios.delete(endpoint, {
      headers: {
        'Authorization': `Bearer ${token.data.accessToken}`
      }
    })
    .then(() => {
      setCandidates(candidates.filter(candidate => candidate.id !== id));
      console.log('Candidate deleted successfully');
    })
    .catch(error => {
      console.error('There was an error deleting the candidate!', error);
      if (error.response && error.response.status === 403) {
        setError('Access denied. You do not have permission to delete this candidate.');
      } else {
        setError('Failed to delete candidate.');
      }
    });
  };
  
  // Function to get user role from the token
  const getUserRole = (token) => {
    try {
      if (token.data && token.data.roles && token.data.roles.length > 0) {
        return token.data.roles[0]; // Use the role directly from data.roles array
      }
    } catch (error) {
      console.error('Error getting user role:', error);
      return null;
    }
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
