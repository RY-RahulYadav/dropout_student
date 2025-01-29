const mongoose = require("mongoose");
const { type } = require("os");

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },
  collegeOrSchoolName: {
    type: String,
    required: true,
  },
  parentEmail: {
    type: String,
  },
  parentPhoneNumber: {
    type: String,
  },
  courseDuration: {
    type: Number,
    required: true,
  },
  classX: { type: Number, default: 20},
  classXII: { type: Number, default: 20 },
  gratution: { type: Number, default: 20 },
  healthissue: { type: String },
  previousFee: { type: Boolean },
  gender: { type: String },
  attendance: {
    type: Number,
    default: 0,
  },
  backlogs: {
    type: Number,
    default: 0,
  },
  behaviorRating: {
    type: Number,
    min: 1,
    max: 10,
  },
  coursePursuing: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  studentPhoneNumber: {
    type: String,
    required: true,
  },
  familyincome: { type: Number, default: 100 },
  educationLoan: { type: String },
  isdropout: { type: String, default: "No" },
  chancedropout: { type: Number, default: 0 },
  govtCoursesAvailed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  scholarshipsAvailed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scholarship",
    },
  ],
  password: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
