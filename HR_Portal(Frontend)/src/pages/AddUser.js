// import axios from "axios";
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function AddUser() {
//   let navigate = useNavigate();

//   const [user, setUser] = useState({
//     name: "",
//     position: "",
//     salary: "",
//   });

//   const { name, position, salary } = user;

//   const onInputChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post("http://localhost:8082/api/candidates", user);
//     navigate("/candidates"); // Update the path to your employee list page
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
//           <h2 className="text-center m-4">Register Candidate</h2>

//           <form onSubmit={(e) => onSubmit(e)}>
//             <div className="mb-3">
//               <label htmlFor="Name" className="form-label">
//                 Name
//               </label>
//               <input
//                 type={"text"}
//                 className="form-control"
//                 placeholder="Enter employee name"
//                 name="name"
//                 value={name}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="Position" className="form-label">
//                 Position
//               </label>
//               <input
//                 type={"text"}
//                 className="form-control"
//                 placeholder="Enter employee position"
//                 name="position"
//                 value={position}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="Salary" className="form-label">
//                 Salary
//               </label>
//               <input
//                 type={"number"}
//                 className="form-control"
//                 placeholder="Enter employee salary"
//                 name="salary"
//                 value={salary}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>
//             <button type="submit" className="btn btn-outline-primary">
//               Submit
//             </button>
//             <Link className="btn btn-outline-danger mx-2" to="/employee-list">
//               Cancel
//             </Link>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    position: "",
    salary: "",
  });

  const { name, position, salary } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the token data from local storage
      const storedData = JSON.parse(localStorage.getItem("token")); // Adjust the key if needed

      // Check if storedData exists and contains the accessToken
      if (!storedData || !storedData.data || !storedData.data.accessToken) {
        console.error("No token found in local storage.");
        alert("You are not logged in. Please log in and try again.");
        return;
      }

      // Extract the access token
      const token = storedData.data.accessToken;
      console.log("JWT Token:", token);

      const userRole = storedData.data.roles[0]; // Assuming the role is stored in the token data

console.log("User Role:", userRole);

// Initialize endpoint variable
let endpoint = "";

// Determine the correct endpoint based on the user's role for candidate operations
if (userRole === "ROLE_ADMIN") {
  endpoint = "http://localhost:8082/api/admin/candidates"; // Admin endpoint for candidates
} else if (userRole === "ROLE_HR") {
  endpoint = "http://localhost:8082/api/hr/candidates"; // HR endpoint for candidates
} else {
  console.error("Invalid user role. Cannot determine the correct endpoint.");
  alert("You do not have the necessary permissions to perform this action.");
  return;
}

// Now, you can use this endpoint to make a POST request for candidate-related operations



      // Send POST request with Authorization header
      await axios.post(
        endpoint, // Ensure this endpoint is correct
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Navigate to the candidates page upon successful submission
      navigate("/candidates");
    } catch (error) {
      console.error("Error adding user:", error);

      // Handle unauthorized access or other errors
      if (error.response && error.response.status === 403) {
        alert("Access denied. You are not authorized to perform this action.");
      } else {
        alert("An error occurred while adding the user. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register Candidate</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter candidate name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Position" className="form-label">
                Position
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter candidate position"
                name="position"
                value={position}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Salary" className="form-label">
                Salary
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter candidate salary"
                name="salary"
                value={salary}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/candidates">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
