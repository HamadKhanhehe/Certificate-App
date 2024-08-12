



import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ForgetPswd() {

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
  
    email: ''
  });

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/auth/fpswd", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Success:', result);
        navigate("/home")
        // Perform login actions, like storing user data in context or redirecting to another page
      } else {
        console.error('Error:', "Incorrect Email");
      }
    } catch (error) {
      console.error('Error:', error); 
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="max-w-md w-full bg-white p-8 border border-gray-300">
      <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
      <form onSubmit={handleSubmit}>
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-2"
          onClick={() => setIsLogin(!isLogin)}
        >
          Submit    
        </button>
      </form>
    </div>
  </div>
  );
}

export default ForgetPswd;