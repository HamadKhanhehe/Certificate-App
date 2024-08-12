
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
  
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();


      if (result.user.role === 'admin') {
        console.log('Success:', result);
        navigate('/home'); // Redirect to admin dashboard if role is admin
      } else if (result.user.role === 'user') {
        console.log('Success:', result);
        // After successful login
        // Create an object with the necessary user data
const user = {
  firstName: result.user.firstName,
  _id: result.user._id,
  hasPermission: result.user.hasPermission
};

// Store the object in localStorage as a string
localStorage.setItem('User', JSON.stringify(user));

// Store the permission separately if you still want to
localStorage.setItem('hasPermission', result.user.hasPermission);

// Check the stored data
console.log('user:', localStorage.getItem('User'));
console.log('Set permission:', localStorage.getItem('hasPermission'));


        navigate('/certificate'); // Redirect to user dashboard if role is user
      }  else  {
        console.error('Error:', "Incorrect Password");
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="max-w-md w-full bg-white p-8 border border-gray-300">
      <img src="\login.png" alt="logo" height={100} />
      <h2 className="text-2xl font-bold mb-6">Login</h2>
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
        <Link to={"/forgetpswd"}>Forget Password</Link>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-2"
          onClick={() => setIsLogin(!isLogin)}
        >
          Login
        </button>
        <Link to={'/register'}>
        <p>Dont have an account? Signup</p>
        </Link>
      </form>
    </div>
  </div>
  );
}

export default Login;