import React from 'react';

import axios from 'axios';

const HRList = () => {
  const [hrList, setHRList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8082/api/hr')
      .then(response => {
        setHRList(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the HR data!", error);
      });
  }, []);

  return (
    <div>
      <h2>HR List</h2>
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
          {hrMembers.map((hr, index) => (
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
