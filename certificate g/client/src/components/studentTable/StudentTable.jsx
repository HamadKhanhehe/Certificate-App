// components/StudentList.js
import React, { useEffect, useState } from 'react';

const StudentTable = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/data');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
        setStudents([]); // Set to empty array on error
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-4 bg-lime-300">
      <h1 className="text-2xl text-center font-bold mb-4">Student List</h1>
      <table className="w-3/5 mx-auto bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Class</th>
            <th className="px-4 py-2 border-b">Roll Number</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
              <td className="px-4 py-2 border-b">{student.id}</td>
              <td className="px-4 py-2 border-b">{student.name}</td>
              <td className="px-4 py-2 border-b">{student.class}</td>
              <td className="px-4 py-2 border-b">{student.rollNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
