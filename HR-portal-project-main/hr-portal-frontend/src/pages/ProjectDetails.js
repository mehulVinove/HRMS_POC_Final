import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProjectDetails.css'; 

const ProjectDetails = () => {
  const { id } = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    axios.get(`http://localhost:8082/api/projects/${id}`)
      .then(response => {
        setProject(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the project details!', error);
        setError('Failed to fetch project details.');
      });
  }, [id]);

  return (
    <div >
      <h1 >Project Details</h1>
      {error && <p>{error}</p>}
      {project ? (
        <div>
          <h2>{project.name}</h2>
          <p>Description: {project.description}</p>
          <p>Status: {project.status}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProjectDetails;
