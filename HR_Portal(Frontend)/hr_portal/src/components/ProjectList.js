import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8082/api/admin/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the projects!', error);
        setError('Failed to fetch projects.');
      });
  }, []);

  return (
    <div className='centered-text '>
              <video autoPlay loop muted className="video">
        <source src="/videos/video-1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h2>Project List</h2>
      {error && <p>{error}</p>}
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            {project.name} - {project.description} - {project.status} 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
