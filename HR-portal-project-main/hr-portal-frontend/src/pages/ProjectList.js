import React from 'react';

const ProjectList = () => {
    const projects = [
      { id: 1, name: 'HRMS', description: 'Java Project', status: 'In Progress' },
      { id: 2, name: 'Website Redesign', description: 'React Project', status: 'Completed' },
      { id: 3, name: 'Mobile App', description: 'Flutter Project', status: 'In Progress' }
    ];
  
    return (
      <div>
        <h2>Project List</h2>
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
  
  export default ProjectList;