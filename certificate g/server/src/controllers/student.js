// import Student from '../models/Student.js';
// // const QRCode = require('qrcode');

// import QRCode from 'qrcode';

// // Add a new student
// const addStudent = async (req, res) => {
//   try {
//     const { name, class: studentClass } = req.body;
//     const qrCode = await QRCode.toDataURL(JSON.stringify({ name, class: studentClass }));
//     const student = new Student({ name, class: studentClass, qrCode });
//     await student.save();
//     res.status(201).json(student);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export default addStudent;

// // Update student details
// exports.updateStudent = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, class: studentClass } = req.body;
//     const student = await Student.findByIdAndUpdate(id, { name, class: studentClass }, { new: true });
//     if (!student) {
//       return res.status(404).json({ error: 'Student not found' });
//     }
//     res.json(student);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Retrieve all students
// exports.getAllStudents = async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Retrieve a single student by ID
// exports.getStudentById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const student = await Student.findById(id);
//     if (!student) {
//       return res.status(404).json({ error: 'Student not found' });
//     }
//     res.json(student);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
