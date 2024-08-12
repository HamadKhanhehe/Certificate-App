// controllers/studentController.js
// import StudentData from '../models/studentModel.js';
import StudentData from "../models/studentData.js";

// Controller to get all students
export const getData = async (req, res) => {
  try {
    const students = await StudentData.find({});
    res.status(200).send(students);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
