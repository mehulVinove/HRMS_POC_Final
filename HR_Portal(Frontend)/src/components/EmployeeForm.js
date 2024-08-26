// // src/components/EmployeeForm.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const EmployeeForm = () => {
//   const [name, setName] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios.post('http://localhost:8082/api/admin/employees', { name })
//       .then(response => console.log('Employee added!', response))
//       .catch(error => console.error('There was an error adding the employee!', error));
//   };

//   return (
//     <div>
//       <h2>Add Employee</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Employee Name"
//           required
//         />
//         <button type="submit">Add Employee</button>
//       </form>
//     </div>
//   );
// };

// export default EmployeeForm;
// src/components/EmployeeForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EmployeeForm = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get the JWT token from local storage
    const token = JSON.parse(localStorage.getItem('token'));

    // Determine the endpoint based on the user's role
    const role = JSON.parse(localStorage.getItem('userRole'));
    const endpoint = role === 'ROLE_ADMIN'
      ? 'http://localhost:8082/api/admin/employees'
      : 'http://localhost:8082/api/hr/employees';

    axios.post(endpoint, { name }, {
      headers: {
        'Authorization': `Bearer ${token.data.accessToken}`  // Add the token to the Authorization header
      }
    })
      .then(response => {
        console.log('Employee added!', response);
        setName('');  // Clear the input field after successful submission
      })
      .catch(error => {
        console.error('There was an error adding the employee!', error);
        setError('Failed to add employee.');
      });
  };

  return (
    <div>
      <h2>Add Employee</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Employee Name"
          required
          className="form-control my-2"
        />
        <button type="submit" className="btn btn-primary">Add Employee</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
