import React from 'react';
import { useState,useEffect } from 'react';

import axios from 'axios';


// const HRList = () => {
//   const [hrList, setHRList] = useState([]); // Correct state name

//   useEffect(() => {
//     const token = JSON.parse(localStorage.getItem('token'));

//     axios.get('http://localhost:8082/api/admin/hr', {
//         headers: {
//           'Authorization': `Bearer ${token.data.accessToken}`  // Add the token to the Authorization header
//         }
//       })

    

//       .then(response => {
//         setHRList(response.data); // Correctly set the state with response data
//       })
//       .catch(error => {
//         console.error("There was an error fetching the HR data!", error);
//       });
//   }, []);

//   return (
//     <div>
     
//       <table className="table">
//         <thead>
//           <tr>
//             <th>S.N</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {hrList.map((hr, index) => ( // Use 'hrList' instead of 'hrMembers'
//             <tr key={hr.id}>
//               <td>{index + 1}</td>
//               <td>{hr.name}</td>
//               <td>{hr.email}</td>
//               <td>
//                 <button className="btn btn-primary">Edit</button>
//                 <button className="btn btn-danger">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default HRList;

const HRList = () => {
  const [hrList, setHRList] = useState([]);
  const [error, setError] = useState(null);

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

    // Determine the endpoint based on user role
    const endpoint =
      userRole === 'ROLE_ADMIN' ? 'http://localhost:8082/api/admin/hr' :
      userRole === 'ROLE_HR' ? 'http://localhost:8082/api/hr/hr' : null;

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
      setHRList(response.data); // Correctly set the state with response data
    })
    .catch(error => {
      console.error('There was an error fetching the HR data!', error);
      if (error.response && error.response.status === 403) {
        setError('Access denied. You do not have permission to view this resource.');
      } else {
        setError('Failed to fetch HR data.');
      }
    });
  }, []);

  return (
    <div>
      <h2>HR List</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>S.N</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hrList.map((hr, index) => (
              <tr key={hr.id}>
                <td>{index + 1}</td>
                <td>{hr.name}</td>
                <td>{hr.email}</td>
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

export default HRList;