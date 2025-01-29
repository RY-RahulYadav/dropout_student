const express = require("express");
const router = express.Router();
const Student = require("../model/student.schema");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");


router.post("/login", async (req, res) => {

  try {
    let user = await Student.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: "Try with correct Login credentials" });
    }
    let passwdchk = await bcrypt.compare(req.body.password, user.password);
    if (!passwdchk) {
      return res
        .status(400)
        .json({ errors: "Try with correct Login credentials" });
    }

    const token = jwt.sign({ email: user.email, type: "student" }, process.env.JWT_KEY)
    res.status(200).json({ message: "user login successfully", uid: token })
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/get', fetchuser, async (req, res) => {
  try {
    const email = req.user.email;

    // Find the college by ID
    const student = await Student.findOne({ email } , "-password");

    if (!student) {
      return res.status(404).json({ msg: 'student not found' });
    }

    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})


router.put('/update', fetchuser, async (req, res) => {
  const email = req.user.email;
    
  const {
    parentEmail,
    parentPhoneNumber,
    backlogs,
    classX,
    classXII,
    gratution,
    family_income, // Array of objects with class and grade
  } = req.body;

  try {
    // Find the student by ID and update the details
    const updatedStudent = await Student.findOneAndUpdate(
      { email },
      {
        parentEmail,
        parentPhoneNumber,
        backlogs,
        classX,
        classXII,
        gratution,
        family_income
      },
      { new: true, runValidators: true } // Return the updated document and validate
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // i want to send successs and then data in json format
    // res.status(200).json(updatedStudent);
    res.json({ message: 'success', updatedStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/getall', async (req, res) => {
  try {
    // Fetch all student records from the database
    const students = await Student.find({});
    
    // Send the fetched data as a JSON response
    res.json(students);
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    res.status(500).json({ message: 'Error fetching student data', error: error.message });
  }
});
module.exports = router;
