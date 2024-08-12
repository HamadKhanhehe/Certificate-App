



import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import Card from 'react-bootstrap/Card';
import { PiStudent } from "react-icons/pi";
import { IoBookOutline } from "react-icons/io5";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import { useState,useEffect } from 'react';


export const Home = () => {


  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3002/auth/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handlePermissionToggle = async (userId, hasPermission) => {
    try {
      const response = await fetch('http://localhost:3002/auth/update-permission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, hasPermission }),
      });
  
      if (response.ok) {
        // Update the permission in the local state
        setUsers(users.map(user =>
          user._id === userId ? { ...user, hasPermission } : user
        ));
  
        // Retrieve the logged-in user from localStorage
        const userString = localStorage.getItem('User');
  
        // Check if the user string exists and is valid JSON
        if (userString) {
          try {
            const loggedInUser = JSON.parse(userString);
  
            // Check if the logged-in user's ID matches the one being updated
            if (loggedInUser._id === userId) {
              // Update the permission in localStorage
              loggedInUser.hasPermission = hasPermission;
              localStorage.setItem('User', JSON.stringify(loggedInUser));
            }
          } catch (error) {
            console.error('Failed to parse user from localStorage:', error);
          }
        } else {
          console.error('No user found in localStorage.');
        }
      } else {
        console.error('Failed to update permission:', await response.text());
      }
    } catch (error) {
      console.error('Failed to update permission:', error);
    }
  };


  const data = [
    {
      name: 'Students',
      uv: 5000,
      pv: 7500,
      amt: 2220,
    },
    {
      name: 'Trainers',
      uv: 3000,
      pv: 5000,
      amt: 2220,
    },
    {
      name: 'Admin',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Staff',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
  ];

  //2nd
  const data2 = [
    {
      subject: 'Web & Mobile Development',
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: 'Graphic Design',
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'English',
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'E-commerce',
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: 'Marketing',
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: 'AI',
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];

  return (
    <>
      <div className='flex flex-col items-center mt-5 leading-10'>
        <div className='mb-3'>
          <h2>Admin Dashboard</h2>
        </div>
        <div id='cards' className='flex gap-4'>
          <div id='1'>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Present | Today</Card.Title>
                <h3 className='text-customBlue'>1000</h3>
                <div className='flex items-center justify-between'>
                  <div>
                    <Card.Text>
                      12% increase
                    </Card.Text>
                  </div>
                  <div>
                    <PiStudent className='text-3xl' />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div id='2'>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Absent | Today</Card.Title>
                <h3 className='text-customBlue'>63</h3>
                <div className='flex items-center justify-between'>
                  <div>
                    <Card.Text>
                      4% increase
                    </Card.Text>
                  </div>
                  <div>
                    <PiStudent className='text-3xl' />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div id='3'>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Courses | Total</Card.Title>
                <h3 className='text-customBlue'>7</h3>
                <div className='flex items-center justify-between'>
                  <div>
                    <Card.Text>
                      +2 new
                    </Card.Text>
                  </div>
                  <div>
                    <IoBookOutline className='text-3xl'  />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div> <br />

        <div className='flex gap-40 w-2/3'>
          <div id='chart' className="" style={{ width: '55%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div id='other-chart' className='absolute right-0' style={{ width: '50%', height: 350 }}>
            <ResponsiveContainer>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data2}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

{/* admin dash */}
{/* <div>
      <h1>Admin Dashboard</h1>
      {users.map(user => (
        <div key={user._id}>
          <span>{user.firstName}</span>
          <span>{user.lastName}</span>
          <button onClick={() => handlePermissionToggle(user._id, !user.hasPermission)}>
            {user.hasPermission ? 'Revoke Permission' : 'Grant Permission'}
          </button>
        </div>
      ))}
    </div> */}


    {/* 2nd dash */}
    <div className='relative top-20 right-24 text-2xl h-[500px]'>
  <h1 className="text-3xl font-semibold mb-4">Students Enrolled</h1>
  
  <table className='w-[800px] bg-white border border-gray-200 text-center'>
    <thead>
      <tr className='bg-gray-100 border-b'>
        <th>Name</th>
        <th>Eligibility</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user._id} className='border-b hover:bg-gray-50 text-center'>
          <td>{user.firstName}</td>
          <td>
            <button onClick={() => handlePermissionToggle(user._id, !user.hasPermission)}>
              {user.hasPermission ? 'Eligible' : 'Not Eligible'}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      </div>
    </>
  );
};
