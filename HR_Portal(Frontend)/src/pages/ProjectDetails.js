import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProjectDetails.css'; 



// const ProjectDetails = () => {
//   const [projects, setProjects] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Retrieve the token from localStorage
//     const token = JSON.parse(localStorage.getItem('token'));
//     console.log('Token:', token); // Debugging: Check token retrieval

//     if (!token || !token.data.accessToken) {
//       setError('Token is missing or invalid');
//       return;
//     }

//     // Extract user role from the token
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
//     console.log('User role:', userRole); // Debugging: Log user role

//     // Determine the endpoint based on user role
//     const endpoint =
//       userRole === 'ROLE_ADMIN' ? 'http://localhost:8082/api/admin/projects' :
//       userRole === 'ROLE_HR' ? 'http://localhost:8082/api/hr/projects' : null;

//     if (!endpoint) {
//       setError('Invalid user role or unauthorized access');
//       return;
//     }

//     // Make the API call with the correct endpoint
//     axios.get(endpoint, {
//       headers: {
//         'Authorization': `Bearer ${token.data.accessToken}`  // Add the token to the Authorization header
//       }
//     })
//     .then(response => {
//       setProjects(response.data);
//     })
//     .catch(error => {
//       console.error('There was an error fetching the project data!', error);
//       setError('Failed to fetch project data.');
//     });
//   }, []);

//   return (
//     <div>
//       <h2>Project List</h2>
//       {error ? (
//         <p>{error}</p>
//       ) : (
//         <table className="table">
//           <thead>
//             <tr>
//               <th>S.N</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {projects.map((project, index) => (
//               <tr key={project.id}>
//                 <td>{index + 1}</td>
//                 <td>{project.name}</td>
//                 <td>{project.description}</td>
//                 <td>{project.status}</td>
//                 <td>
//                   <button className="btn btn-primary">Edit</button>
//                   <button className="btn btn-danger">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ProjectDetails;

const ProjectDetails = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = JSON.parse(localStorage.getItem('token'));
    console.log('Token:', token); // Debugging: Check token retrieval

    if (!token || !token.data || !token.data.accessToken) {
      setError('Token is missing or invalid');
      return;
    }

    // Extract user role from the token
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
    console.log('User role:', userRole); // Debugging: Log user role

    // Determine the endpoint based on user role
    const endpoint =
      userRole === 'ROLE_ADMIN' ? 'http://localhost:8082/api/admin/projects' :
      userRole === 'ROLE_HR' ? 'http://localhost:8082/api/hr/projects' : null;

    if (!endpoint) {
      setError('Invalid user role or unauthorized access');
      return;
    }

    // Make the API call with the correct endpoint
    axios.get(endpoint, {
      headers: {
        'Authorization': `Bearer ${token.data.accessToken}`  // Add the token to the Authorization header
      }
    })
    .then(response => {
      setProjects(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the project data!', error);
      if (error.response && error.response.status === 403) {
        setError('Access denied. You do not have permission to view this resource.');
      } else {
        setError('Failed to fetch project data.');
      }
    });
  }, []);

  return (
    <div>
      <h2>Project List</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>S.N</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id}>
                <td>{index + 1}</td>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.status}</td>
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

export default ProjectDetails;