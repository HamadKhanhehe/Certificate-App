



import React, { useRef, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Template from '../../components/template/Template';
import { useNavigate } from 'react-router-dom';
import { LogoutBtn } from '../../components/logoutBtn/LogoutBtn';

function CertificateGenerator() {
  const [name, setName] = useState('');
  const [courseDate, setCourseDate] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const certificateRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // const permission = localStorage.getItem('hasPermission');
    // console.log('Permission from localStorage:', permission); // Check value here
    const user = JSON.parse(localStorage.getItem('User'));
    const hasPermission = user?.hasPermission || false;
  
    console.log('permission from localStorage', hasPermission);
    setHasPermission(hasPermission === 'true');
  }, []);



  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCourseDateChange = (e) => {
    setCourseDate(e.target.value);
  };

  const handleInstructorNameChange = (e) => {
    setInstructorName(e.target.value);
  };

  const handleGenerateCertificate = () => {
    // Always retrieve the latest permission status
    const user = JSON.parse(localStorage.getItem('User'));
    const hasPermission = user?.hasPermission || false;
  
    console.log('User permission:', hasPermission);
  
    if (hasPermission) {
      setShowCertificate(true);
    } else {
      alert('You do not have permission to generate a certificate.');
    }
  };


  const downloadCertificate = async () => {
    if (!name.trim() || !courseDate.trim() || !instructorName.trim()) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const canvas = await html2canvas(certificateRef.current);
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('certificate.pdf');
  };

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className=" mb-4 border-2 border-red-400 w-[500px]">
        <h3 className='text-center mb-10'>GENERATE YOUR CERTIFICATE</h3>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter name"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />
        <label>Course:</label>
        <input
          type="text"
          value={courseDate}
          onChange={handleCourseDateChange}
          placeholder="Course name"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />
        <label>Instructor:</label>
        <input
          type="text"
          value={instructorName}
          onChange={handleInstructorNameChange}
          placeholder="Enter instructor name"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={handleGenerateCertificate}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Generate Certificate
        </button>
      </div>

      {showCertificate && (
        <div className="w-full max-w-md">
          <Template
            ref={certificateRef}
            name={name || 'Your Name'}
            courseDate={courseDate || 'Date'}
            instructorName={instructorName || 'Instructor Name'}
          />
          <button
            onClick={downloadCertificate}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Download Certificate
          </button>
        </div>
      )}

    </div>
  );
}

export default CertificateGenerator;
