import mongoose from 'mongoose';

const studentDataSchema = mongoose.Schema({
    id: { type: Number },
    name: { type: String},
    class: { type: String },
    rollNumber: { type: Number, required: true },
});

const StudentData = mongoose.model('StudentData', studentDataSchema);

export default StudentData;
