// import React from 'react';

// const ProjectList = () => {
//     const projects = [
//       { id: 1, name: 'HRMS', description: 'Java Project', status: 'In Progress' },
//       { id: 2, name: 'Website Redesign', description: 'React Project', status: 'Completed' },
//       { id: 3, name: 'Mobile App', description: 'Flutter Project', status: 'In Progress' }
//     ];
//     useEffect(() => {
//       const token = JSON.parse(localStorage.getItem('token'));
  
//       axios.get('http://localhost:8082/api/admin/projects', {
//           headers: {
//             'Authorization': `Bearer ${token.data.accessToken}`  // Add the token to the Authorization header
//           }
//         })
//         .then(response => {
//           setProject(response.data);
//         })
//         .catch(error => {
//           console.error('There was an error fetching the project details!', error);
//           setError('Failed to fetch project details.');
//         });
//     }, [id]);
    
//     return (
//       <div>
//         <h2>Project List</h2>
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
//       </div>
//     );
//   };
  
//   export default ProjectList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token || !token.data || !token.data.accessToken) {
          throw new Error('Token is missing or invalid');
        }

        const response = await axios.get('http://localhost:8082/api/admin/projects', {
          headers: {
            'Authorization': `Bearer ${token.data.accessToken}`,  // Add the token to the Authorization header
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error('There was an error fetching the project details!', error);
        setError('Failed to fetch project details.');
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token || !token.data || !token.data.accessToken) {
        throw new Error('Token is missing or invalid');
      }

      await axios.delete(`http://localhost:8082/api/admin/projects/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${token.data.accessToken}`,  // Add the token to the Authorization header
        },
      });

      // Update state to remove deleted project
      setProjects(projects.filter(project => project.id !== projectId));
    } catch (error) {
      console.error('There was an error deleting the project!', error);
      setError('Failed to delete the project.');
    }
  };

  return (
    <div>
      <h2>Project List</h2>
      {error && <p className="text-danger">{error}</p>}
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
                  onClick={() => handleDelete(project.id)}
                >
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

export default ProjectList;
