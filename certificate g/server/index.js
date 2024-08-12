import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './src/routes/Auth.js';
import dataRouter from './src/routes/StudentData.js';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const app = express();
const PORT = process.env.PORT || 3002;

dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: "Server is up and running." });
});


//middleware
app.use('/auth', router);
// app.use('/api', studentRoute);
app.use('/api', dataRouter);



// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`MongoDB connected`);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error(`MongoDB connection error: ${error}`);
});








