const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  teacherId: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  coursename: { type: String, required: true },
  collegeOrSchoolName: {
    type: String,
    required: true,  
  },
  qualification: {
      type: String,
      default:"M.tech",
    }
  ,
  email: { type: String, required: true },
  student: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  password: {
    type: String,
    required: true,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
