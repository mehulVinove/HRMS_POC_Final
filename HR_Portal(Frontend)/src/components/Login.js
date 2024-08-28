import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate= useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8082/api/auth/signin', {
                username: username,
                password: password
            });
             
            console.log('Response:', response);
           
           
            console.log('Login successful:', response.data);
            localStorage.setItem('token', JSON.stringify(response));
            
            setIsAuthenticated(true);
            
            //navigate('/home');
            navigate('/home');

            console.log('Login successful:', response.data);
      

        } catch (err) {
            console.error('Login failed:', err);
            setError('Login failed: Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

// import {
//     MDBBtn,
//     MDBContainer,
//     MDBRow,
//     MDBCol,
//     MDBInput
//   } from 'mdb-react-ui-kit';
  
//   const Login = ({ setIsAuthenticated }) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
  
//     const navigate = useNavigate();
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
  
//       try {
//         const response = await axios.post('http://localhost:8082/api/auth/signin', {
//           username: username,
//           password: password
//         });
  
//         console.log('Response:', response);
//         console.log('Login successful:', response.data);
  
//         // Store the token from the response in localStorage
//         localStorage.setItem('token', JSON.stringify(response.data.token));
  
//         setIsAuthenticated(true);
  
//         // Redirect to the home page after successful login
//         navigate('/home');
//       } catch (err) {
//         console.error('Login failed:', err);
//         setError('Login failed: Invalid username or password');
//       }
//     };
  
//     return (
//       <MDBContainer className="my-5 gradient-form">
//         <MDBRow>
//           <MDBCol col='6' className="mb-5">
//             <div className="d-flex flex-column ms-5">
//               <div className="text-center">
//                 <img 
//                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
//                   style={{ width: '185px' }} 
//                   alt="logo" 
//                 />
//                 <h4 className="mt-1 mb-5 pb-1">HRMS Portal</h4>
//               </div>
  
//               <p>Please login to your account</p>
  
//               <form onSubmit={handleSubmit}>
//                 <MDBInput 
//                   wrapperClass='mb-4' 
//                   label='Username' 
//                   id='form1' 
//                   type='text' 
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//                 <MDBInput 
//                   wrapperClass='mb-4' 
//                   label='Password' 
//                   id='form2' 
//                   type='password'
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
  
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
  
//                 <div className="text-center pt-1 mb-5 pb-1">
//                   <MDBBtn type="submit" className="mb-4 w-100 gradient-custom-2">Sign in</MDBBtn>
//                   <a className="text-muted" href="#!">Forgot password?</a>
//                 </div>
//               </form>
  
//               <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
//                 <p className="mb-0">Don't have an account?</p>
//                 <MDBBtn outline className='mx-2' color='danger'>Register</MDBBtn>
//               </div>
//             </div>
//           </MDBCol>
  
//           <MDBCol col='6' className="mb-5">
//             <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
//               <div className="text-white px-3 py-4 p-md-5 mx-md-4">
//                 <h4 className="mb-4">We are more than just a company</h4>
//                 <p className="small mb-0">
//                   Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
//                   tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
//                   quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//                 </p>
//               </div>
//             </div>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//     );
//   };
  
//   export default Login;