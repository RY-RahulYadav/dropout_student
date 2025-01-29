const express = require("express");
const router = express.Router();
const College = require("../model/college.schema");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const sendEmail = require("../service/email");
const Teacher = require("../model/teacher.schema");
const generatePassword = require("password-generator");
const Govt = require('../model/goverment.schema')


router.post("/register", async (req, res) => {
    try {
        const { collegeId, name, department, email, password ,collegeType } = req.body
        if (!(collegeId || name || department || collegeType || email || password)) {
            res.status(400).json({ message: "input missing" })
        }

        const college = await College.findOne({ email })


        if (college) {
            return res.status(409).json({ message: " already register" })
        }

        const saltRound = parseInt(process.env.SALT);
        const hash_pass = await bcrypt.hash(password, saltRound)




        const user = await College.create({ collegeId, name, department,collegeType, email, password: hash_pass })


        const token = jwt.sign({ email: user.email, type: "college" }, process.env.JWT_KEY)

        res.status(200).json({ message: "user signup successfully", uid: token })

    }
    catch (err) {
        res.status(500).json({ message: "server internal error", err: err })
    }
}
)


router.post("/login", async (req, res) => {

    try {
        let user = await College.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(400)
                .json({ errors: "Try with correct Login credentials" });
        }
        let passwdchk = await bcrypt.compare(req.body.password, user.password);
        if (!passwdchk) {
            return res
                .status(400)
                .json({  errors: "Try with correct Login credentials" });
        }

        const token = jwt.sign({ email: user.email, type: "college" }, process.env.JWT_KEY)
        res.status(200).json({ message: "user signup successfully", uid: token })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});




router.post('/add-teacher', async (req, res) => {
    const { teacherId, name, coursename, collegeOrSchoolName, email, collegeId } = req.body;
    const password = generatePassword();
    
    try {
        // Find the college by collegeId
        const college = await College.findOne({ collegeId });
        if (!college) {
            return res.status(404).json({ msg: 'College not found' });
        }

        if (!college.name) {
            return res.status(400).json({ msg: 'College name is required' });
        }

        const saltRound = parseInt(process.env.SALT);
        console.log("password:",password);
        const hash_pass = await bcrypt.hash(password, saltRound);

        const teacheruser= await Teacher.findOne({email})
        if(teacheruser){
           return  res.status(400).send("teacher already register")
        }
        // Create a new teacher
        const teacher = new Teacher({
            teacherId,
            name,
            coursename,
            collegeOrSchoolName,
            email,
            password: hash_pass
        });

        await teacher.save();

        // Update the college with the new teacher
        college.teacher.push(teacher._id);  // Push the teacher's ID to the teacher array
        await college.save();
       
        // Send email to the teacher with credentials
        const subject = 'Welcome to the College';
        const text = `Dear ${name},\n\nYour account has been created successfully.\nEmail: ${email}\nPassword: ${password}\n\nPlease change your password after logging in.\n\nBest regards,\nCollege Team`;
        await sendEmail(email, subject, text);

        res.json({success: true , msg: 'Teacher added and email sent successfully', teacher  , college});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


router.get('/get', fetchuser, async (req, res) => {
    try {
        const email = req.user.email;

        // Find the college by ID
        const college = await College.findOne({email}).populate('student' , '-password').populate('teacher' , '-password');

        if (!college) {
            return res.status(404).json({ msg: 'College not found' });
        }

        res.json(college);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// api to get the teacher of a college by their id
router.get('/get-teacher/:teacherId', fetchuser, async (req, res) => {
    try {
        // const email = req.user.email;
        const { teacherId } = req.params;

        // Find the college by ID
        // const college = await College.findOne({ email }).populate('teacher', '-password');

        // if (!college) {
        //     return res.status(404).json({ msg: 'College not found' });
        // }

        const teacher = await Teacher.findOne({ teacherId });

        if (!teacher) {
            return res.status(404).json({ msg: 'Teacher not found' });
        }

        res.json(teacher);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
