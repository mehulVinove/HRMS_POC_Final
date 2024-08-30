import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddProject() {
  let navigate = useNavigate();

  const [project, setProject] = useState({
    name: "",
    description: "",
    status: "",
  });

  const { name, description, status } = project;

  const onInputChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the token data from local storage
      const storedData = JSON.parse(localStorage.getItem("token")); // Adjust the key if your storage method or key is different

      // Check if storedData exists and contains the accessToken
      if (!storedData || !storedData.data || !storedData.data.accessToken) {
        console.error("No token found in local storage.");
        alert("You are not logged in. Please log in and try again.");
        return;
      }

      // Extract the access token
      const token = storedData.data.accessToken;
      console.log("JWT Token:", token);

      // Send POST request with Authorization header
      await axios.post(
        "http://localhost:8082/api/admin/projects",
        project,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Navigate to the projects page upon successful submission
      navigate("/projects");
    } catch (error) {
      console.error("Error adding project:", error);

      // Handle unauthorized access or other errors
      if (error.response && error.response.status === 403) {
        alert("Access denied. You are not authorized to perform this action.");
      } else {
        alert("An error occurred while adding the project. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Project</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter project name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter project description"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Status" className="form-label">
                Status
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter project status"
                name="status"
                value={status}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/projects">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
