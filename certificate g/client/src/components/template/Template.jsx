// src/components/ctemp/Template.js
import React, { forwardRef } from 'react';

const Template = forwardRef(({ name, courseDate, instructorName }, ref) => {
  return (
    <div ref={ref} className="max-w-md mx-auto p-4 border border-gray-300 shadow-md bg-white">
        <img src="\saylani_logo.png" alt="" />
      <h1 className="text-2xl font-bold text-center mb-4 mt-3">Certificate of Achievement</h1>
      <p className="text-center text-lg mb-4">This is to certify that</p>
      <h2 className="text-center text-xl font-semibold mb-4">{name}</h2>
      <p className="text-center text-lg mb-4">has successfully completed the course!!</p>
      <p className="text-center text-lg mb-4 text-blue-600">YOHOO! ★★★</p>
      <p className="text-center text-lg mb-4 ">Course Name: <span className='font-semibold'> {courseDate}</span></p>
      <p className="text-center text-lg mb-4 ">Instructor: <span className='font-semibold'> {instructorName}</span></p>
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
});

export default Template;
