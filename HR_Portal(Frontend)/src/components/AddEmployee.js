

import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddEmployee() {
  let navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    position: "",
    salary: "",
  });

  const { name, position, salary } = employee;

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the token data from local storage
      const storedData = JSON.parse(localStorage.getItem("token"));

      if (!storedData || !storedData.data || !storedData.data.accessToken) {
        console.error("No token found in local storage.");
        alert("You are not logged in. Please log in and try again.");
        return;
      }

      const token = storedData.data.accessToken;
      console.log("JWT Token:", token);
      const userRole = storedData.data.roles[0]; 

      console.log("User Role:", userRole);
      let endpoint = "";

      if (userRole === "ROLE_ADMIN") {
        endpoint = "http://localhost:8082/api/admin/employees";
      } else if (userRole === "ROLE_HR") {
        endpoint = "http://localhost:8082/api/hr/employees";
      } else {
        console.error("Invalid user role. Cannot determine the correct endpoint.");
        alert("You do not have the necessary permissions to perform this action.");
        return;
      }

      await axios.post(
        endpoint,
        employee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/employees");
    } catch (error) {
      console.error("Error adding employee:", error);

      if (error.response && error.response.status === 403) {
        alert("Access denied. You are not authorized to perform this action.");
      } else {
        alert("An error occurred while adding the employee. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register Employee</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter employee name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
                minLength="1"
                maxLength="50"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Position" className="form-label">
                Position
              </label>
              <select
                className="form-control"
                name="position"
                value={position}
                onChange={(e) => onInputChange(e)}
              >
                <option value="">Select Position</option>
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="Tester">Tester</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="Salary" className="form-label">
                Salary
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter employee salary"
                name="salary"
                value={salary}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/employees">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
