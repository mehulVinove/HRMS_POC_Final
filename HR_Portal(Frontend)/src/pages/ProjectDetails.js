
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ProjectDetails.css'; 

// const ProjectDetails = () => {
//   const [projects, setProjects] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Function to fetch projects based on user role
//     const fetchProjects = async () => {
//       try {
//         // Retrieve the token from localStorage
//         const token = JSON.parse(localStorage.getItem('token'));
//         console.log('Token:', token); // Debugging: Check token retrieval

//         if (!token || !token.data || !token.data.accessToken) {
//           throw new Error('Token is missing or invalid');
//         }

//         // Extract user role from the token
//         const getUserRole = (token) => {
//           try {
//             if (token.data && token.data.roles && token.data.roles.length > 0) {
//               return token.data.roles[0]; // Use the role directly from data.roles array
//             }
//           } catch (error) {
//             console.error('Error getting user role:', error);
//             return null;
//           }
//         };

//         const userRole = getUserRole(token);
//         console.log('User role:', userRole); // Debugging: Log user role

//         // Determine the endpoint based on user role
//         const endpoint =
//           userRole === 'ROLE_ADMIN' ? 'http://localhost:8082/api/admin/projects' :
//           userRole === 'ROLE_HR' ? 'http://localhost:8082/api/hr/projects' : null;

//         if (!endpoint) {
//           throw new Error('Invalid user role or unauthorized access');
//         }

//         // Make the API call with the correct endpoint
//         const response = await axios.get(endpoint, {
//           headers: {
//             'Authorization': `Bearer ${token.data.accessToken}`  // Add the token to the Authorization header
//           }
//         });

//         setProjects(response.data);
//       } catch (error) {
//         console.error('There was an error fetching the project data!', error);
//         if (error.response && error.response.status === 403) {
//           setError('Access denied. You do not have permission to view this resource.');
//         } else {
//           setError('Failed to fetch project data.');
//         }
//       }
//     };

//     fetchProjects();
//   }, []); // Empty dependency array ensures this runs once on component mount

//   return (
//     <div>
//       <h2>Project List</h2>
//       {error ? (
//         <p className="text-danger">{error}</p>
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectDetails.css'; 

const ProjectDetails = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch projects based on user role
    const fetchProjects = async () => {
      try {
        // Retrieve the token from localStorage
        const token = JSON.parse(localStorage.getItem('token'));
        console.log('Token:', token); // Debugging: Check token retrieval

        if (!token || !token.data || !token.data.accessToken) {
          throw new Error('Token is missing or invalid');
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
          throw new Error('Invalid user role or unauthorized access');
        }

        // Make the API call with the correct endpoint
        const response = await axios.get(endpoint, {
          headers: {
            'Authorization': `Bearer ${token.data.accessToken}`  // Add the token to the Authorization header
          }
        });

        setProjects(response.data);
      } catch (error) {
        console.error('There was an error fetching the project data!', error);
        if (error.response && error.response.status === 403) {
          setError('Access denied. You do not have permission to view this resource.');
        } else {
          setError('Failed to fetch project data.');
        }
      }
    };

    fetchProjects();
  }, []); // Empty dependency array ensures this runs once on component mount

  // Function to handle delete operation
  const handleDelete = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const userRole = getUserRole(token);
      const endpoint =
        userRole === 'ROLE_ADMIN' ? `http://localhost:8082/api/admin/projects/${id}` :
        userRole === 'ROLE_HR' ? `http://localhost:8082/api/hr/projects/${id}` : null;

      if (!endpoint) {
        throw new Error('Invalid user role or unauthorized access');
      }

      await axios.delete(endpoint, {
        headers: {
          'Authorization': `Bearer ${token.data.accessToken}` // Add the token to the Authorization header
        }
      });

      // Update the state to remove the deleted project from the list
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      console.error('There was an error deleting the project!', error);
      if (error.response && error.response.status === 403) {
        setError('Access denied. You do not have permission to delete this resource.');
      } else {
        setError('Failed to delete project.');
      }
    }
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
    <div>
      <h2>Project List</h2>
      {error ? (
        <p className="text-danger">{error}</p>
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
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(project.id)} // Call handleDelete with the project's id
                  >
                    Delete
                  </button>
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
