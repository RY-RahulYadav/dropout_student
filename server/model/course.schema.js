const mongoose = require("mongoose");
const { type } = require("os");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  benefits: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
