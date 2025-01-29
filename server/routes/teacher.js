const express = require("express");
const router = express.Router();
const Student = require("../model/student.schema");
const Teacher = require("../model/teacher.schema");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const generatePassword = require("../service/password");
const { google } = require('googleapis');
const Govt = require("../model/goverment.schema");
const sendEmail = require("../service/email");


const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });


router.post("/login", async (req, res) => {

    try {
        let user = await Teacher.findOne({ email: req.body.email });
        
        
        if (!user) {
            return res
                .status(400)
                .json({ errors: "Try with correct Login credentials" });
        }
        let passwdchk = await bcrypt.compare(req.body.password, user.password);
        if (!passwdchk) {
            return res
                .status(400)
                .json({errors: "Try with correct Login credentials" });
        }
        const token = jwt.sign({ email: user.email, type: "student" }, process.env.JWT_KEY)
        res.status(200).json({ message: "user login successfully", uid: token })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.put("/update-student", fetchuser, async (req, res) => {
    const { attendance, backlogs, behaviorRating, studentemail } = req.body;

    try {
        let teacher = await Teacher.findOne({ email: req.user.email });

        if (!teacher) {
            return res.status(404).json({ msg: "Teacher not found" });
        }

        // Await the promise returned by findOne
        const student = await Student.findOne({ email: studentemail });

        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }

        student.attendance = attendance !== undefined ? attendance : student.attendance;
        student.backlogs = backlogs !== undefined ? backlogs : student.backlogs;
        student.behaviorRating = behaviorRating !== undefined ? behaviorRating : student.behaviorRating;

        await student.save();

        res.json({ msg: "Student details updated successfully", student });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


router.get('/get', fetchuser, async (req, res) => {
    try {
        console.log(req.user);
        
        const email = req.user.email;

        // Find the college by ID
        const teacher = await Teacher.findOne({ email }).populate('student');

        if (!teacher) {
            return res.status(404).json({ msg: 'teacher not found' });
        }

        res.json(teacher);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post("/add-student", fetchuser, async (req, res) => {
    const {
        studentId,
        name,
        collegeOrSchoolName,
        courseDuration,
        coursePursuing,
        email,
        attendance,
        behaviorRating,
        healthissue,
        previousFee,
        gender,
        studentPhoneNumber,
    } = req.body;
    const teacheremail = req.user.email;
    try {
        const password = generatePassword();
        const teacher = await Teacher.findOne({email:teacheremail});
        if (!teacher) {
            return res.status(404).json({ msg: "Teacher not found" });
        }

        // Check if student with the same ID already exists
        console.log(email);
        console.log("password:",password);
        let existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res
                .status(400)
                .json({ msg: "Student with this ID already exists" });
        }

        // Hash the password before saving the student
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new student
        const student = new Student({
            studentId,
            name,
            collegeOrSchoolName,
            courseDuration,
            coursePursuing,
            email,
            attendance,
            behaviorRating,
            healthissue,
            previousFee,
            gender,
            studentPhoneNumber,
            password: hashedPassword, // store hashed password
        });

        await student.save();

        // Associate the student with the teacher and college
        teacher.student.push(student._id);
        await teacher.save();
        
        // Send email to the student with credentials
        const subject = "Welcome to the College";
        const text = `Dear Student,\n\nYour account has been created successfully.\nEmail: ${email}\nPassword: ${password}\n\nPlease change your password after logging in.\n\nBest regards,\nCollege Team`;
        await sendEmail(email, subject, text);

        res.json({ success: true , msg: "Student added and email sent successfully", student });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/email-parent", async (req, res) => {
    const { teacheremail, studentemail, meetingDateTime } = req.body;

    try {
        // Find the teacher
        const teacher = await Teacher.findOne({ email: teacheremail });
        if (!teacher) {
            return res.status(404).json({ msg: "Teacher not found" });
        }

        // Find the student
        const student = await Student.findOne({ email: studentemail });
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }

        const parentEmail = student.parentEmail || studentemail;
        const studentName = student.name;

        // Ensure both emails are present
        if (!teacheremail || !parentEmail) {
            return res.status(400).json({ msg: "Missing attendee email(s)" });
        }

        // Convert dd/mm/yy hh:mm to ISO format for 'Asia/Kolkata' time zone
        const [day, month, yearTime] = meetingDateTime.split('/');
        const [year, time] = yearTime.split(' ');  // Separate year and time
        const formattedDate = `${year}-${month}-${day}T${time}:00.000+05:30`; // Adding IST time offset directly

        // Create a Google Meet event on Google Calendar
        const event = {
            summary: `Meeting with Parent of ${studentName}`,
            description: "Discussion about your child’s academic progress.",
            start: {
                dateTime: formattedDate, // ISO formatted date with IST offset
                timeZone: "Asia/Kolkata",
            },
            end: {
                dateTime: new Date(new Date(formattedDate).getTime() + 30 * 60 * 1000).toISOString(), // 30 mins meeting
                timeZone: "Asia/Kolkata",
            },
            attendees: [{ email: teacheremail }, { email: parentEmail }],
            conferenceData: {
                createRequest: {
                    requestId: "some-random-id",
                    conferenceSolutionKey: { type: "hangoutsMeet" },
                },
            },
        };

        // Log event data for debugging
        console.log("Event data:", event);

        // Insert the event into Google Calendar
        const calendarResponse = await calendar.events.insert({
            calendarId: "primary",
            resource: event,
            conferenceDataVersion: 1, // This enables Google Meet link creation
        });

        const googleMeetLink = calendarResponse.data.hangoutLink;

        // Send email to parent with Google Meet and alternative to visit the college
        const subject = "Invitation to Meet about Your Child";
        const text = `Dear Parent,

        We would like to discuss the academic progress of your child, ${studentName}. You can join the meeting online via the Google Meet link below or alternatively visit the college in person to discuss further.

        Google Meet Link: ${googleMeetLink}

        In case you prefer to visit the college, kindly let us know your preferred date and time.

        Best regards,
        ${teacher.teacherName}
        ${teacher.collegeOrSchoolName}`;

        // Send email
        await sendEmail(parentEmail, subject, text);

        res.json({
            msg: "Email sent to parent with Google Meet link",
            googleMeetLink,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});




// Route to store a dropout student ID
router.post('/add-dropout', fetchuser, async (req, res) => {
    try {
        const { email } = req.body;
        
        // Find the student by email
        const student = await Student.findOne({ email });
        
        if (!student) {
            return res.status(404).send("Student not found");
        }
        
        // Mark the student as a dropout
        student.isdropout = true;
        
        // Save the student
        await student.save();
        
        // Find the associated government record (assuming you're looking for a specific Govt record, adjust accordingly)
        const govt = await Govt.findOne({}); // Add criteria to find a specific Govt record if necessary
        
        // Add student to the dropout list in the Govt schema
        if (govt) {
            govt.dropout.push(student._id);
            await govt.save();
        }

        res.status(200).send('Dropout student added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding dropout student');
    }
});




router.post('/predict', fetchuser, async (req, res) => {
    try {
        const email = req.user.email;
        const teacher = await Teacher.findOne({ email }).populate('student');
        if (!teacher) {
            return res.status(404).send("Teacher not found or not logged in");
        }

        
        const student = teacher.student;
        console.log(student);
        // Prepare data for prediction
        const studentDataArray = student.map(student => ({
            attendance: student.attendance,
            behaviorRating: student.behaviorRating,
            classX: student.classX,
            classXII: student.classXII,
            gratution: student.gratution,
            healthissue: student.healthissue ? 1 : 0,
            familyincome: parseFloat(student.familyincome),
            previousFee: student.previousFee ? 1 : 0,
            backlogs: student.backlogs,
            gender: student.gender === 'Male' ? 1 : 0,
            educationLoan: student.educationLoan === 'Yes' ? 1 : 0
        }));
        console.log(studentDataArray);

        // Get predictions from Python API
        const response = await fetch('http://localhost:5000/mlpredict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentDataArray)
        });

        const result = await response.json();
        console.log(result);
        const predictions = result.predictions;
        console.log(predictions);

        // Update student records in the database with predictions
        for (let i = 0; i < student.length; i++) {
            const chancedropout = predictions[i] === 1 ? 1 : 0;
            await Student.updateOne({ _id: student[i]._id }, { chancedropout: chancedropout });
        }

        res.send('Student dropout status updated successfully.');
    } catch (error) {
        console.error('Error updating dropout status:', error);
        res.status(500).send('Error updating dropout status');
    }
});



module.exports = router;
