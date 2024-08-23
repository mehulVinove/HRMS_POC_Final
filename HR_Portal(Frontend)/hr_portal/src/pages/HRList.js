import React from 'react';
import { useState,useEffect } from 'react';

import axios from 'axios';


const HRList = () => {
  const [hrList, setHRList] = useState([]); // Correct state name

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    axios.get('http://localhost:8082/api/admin/hr', {
        headers: {
          'Authorization': `Bearer ${token.data.accessToken}`  // Add the token to the Authorization header
        }
      })

    

      .then(response => {
        setHRList(response.data); // Correctly set the state with response data
      })
      .catch(error => {
        console.error("There was an error fetching the HR data!", error);
      });
  }, []);

  return (
    <div>
     
      <table className="table">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {hrList.map((hr, index) => ( // Use 'hrList' instead of 'hrMembers'
            <tr key={hr.id}>
              <td>{index + 1}</td>
              <td>{hr.name}</td>
              <td>{hr.email}</td>
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

export default HRList;
