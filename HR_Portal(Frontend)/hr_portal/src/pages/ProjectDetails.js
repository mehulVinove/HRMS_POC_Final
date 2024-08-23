import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProjectDetails.css'; 

// const ProjectDetails = () => {
//   const { id } = useParams(); // Get the project ID from the URL
//   const [project, setProject] = useState(null);
//   const [error, setError] = useState(null);
 

//   useEffect(() => {
//     const token = JSON.parse(localStorage.getItem('token'));

//     axios.get('http://localhost:8082/api/admin/projects/1', {
//         headers: {
//           'Authorization': `Bearer ${token.data.accessToken}`  // Add the token to the Authorization header
//         }
//       })
//       .then(response => {
//         setProject(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the project details!', error);
//         setError('Failed to fetch project details.');
//       });
//   }, [id]);

//   return (
//     <div >
//       <h1 >Project Details</h1>
//       {error && <p>{error}</p>}
//       {project ? (
//         <div>
//           <p>Name: {project.name}</p>
//           <p>Description: {project.description}</p>
//           <p>Status: {project.status}</p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default ProjectDetails;

const ProjectDetails = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    axios.get('http://localhost:8082/api/admin/projects', {
      headers: {
        'Authorization': `Bearer ${token.data.accessToken}`  // Add the token to the Authorization header
      }
    })
    .then(response => {
      setProjects(response.data); // Set the projects state with response data
    })
    .catch(error => {
      console.error("There was an error fetching the project data!", error);
      setError('Failed to fetch project data.');
    });
  }, []);

  return (
    <div>
      <h2>Project List</h2>
      {error && <p>{error}</p>}
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
    </div>
  );
};

export default ProjectDetails;