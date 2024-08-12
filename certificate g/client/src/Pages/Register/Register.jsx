

import { useState,   } from 'react';
import { Link, useNavigate } from "react-router-dom";


function Register() {

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
  });
  // const [role, setRole] = useState('user');
const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // if (result.role === 'admin') {
      //   navigate('/admin-dashboard'); // Redirect to admin dashboard if role is admin
      // } else {
      //   navigate('/user-dashboard'); // Redirect to user dashboard if role is user
      // }


      if (response.ok) {
        console.log('Success:', result);
        // Perform login actions, like storing user data in context or redirecting to another page
      } else {
        console.error('Error:', 'user already exist');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="max-w-md w-full bg-white p-8 border border-gray-300">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="firstName">
First Name
          </label>
          <input
            type="text"
            id="fname"
            name='firstName'
            value={formData.firstName}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lname"
            name='lastName'
            value={formData.lastName}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name='email'
            value={formData.email}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name='password'
            value={formData.password}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
         <select className='p-2' name='role' value={formData.role} onChange={handleChange} required >
          <option  value={'user'}>User</option>
          <option value={'admin'}>Admin</option>
         </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={() => setIsLogin(!isLogin)}

        >
          Login
        </button>
        <Link to={'/'}>
        <p>Already have an account? Login</p>
        </Link>
      </form>
    </div>
  </div>
  );
}

export default Register;