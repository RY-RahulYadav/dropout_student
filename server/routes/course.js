const express = require("express");
const router = express.Router();
const Course = require("../model/course.schema");
require("dotenv").config();
const fetchuser = require("../middleware/fetchuser");

router.get("/allcourses", async (req, res) => {
  try {
    let courses = await Course.find({});
    if (courses.length === 0) {
      return res.status(400).json({ errors: "No courses available" });
    } else {
      res.status(200).json({ courses: courses });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/addcourses", fetchuser, async (req, res) => {
  try {
    const { title, description, benefits, duration, startDate, image } =
      req.body;
    if (
      !title ||
      !description ||
      !benefits ||
      !duration ||
      !startDate ||
      !image
    ) {
      res.status(400).json({ message: "input missing" });
    }
    const course = await Course.findOne({ title });

    if (course) {
      return res.status(400).json({ message: "Already Present Course" });
    }
    const coure = await Course.create({
      title,
      description,
      benefits,
      duration,
      startDate,
      image,
    });
    res
      .status(200)
      .json({ message: "Course Added Successfully", course: coure });
  } catch (error) {
    res.status(500).json({ message: "server internal error", error: error });
  }
});

module.exports = router;
