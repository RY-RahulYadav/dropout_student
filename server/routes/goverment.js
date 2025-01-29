const express = require("express");
const router = express.Router();
const Govt = require("../model/goverment.schema");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const Student = require('../model/student.schema')
const Teacher= require('../model/teacher.schema')


router.post("/register", async (req, res) => {
    try {
        const { name, email, GovtDepartment , helpline ,password  } = req.body
        console.log(email);
        
        if (!(name || email || GovtDepartment || helpline || password)) {
            res.status(400).json({ message: "input missing" })
        }

        const govt = await Govt.findOne({ email })
        

        if (govt ) {
            return res.status(409).json({ message: " already register" })
        }

        const saltRound = parseInt(process.env.SALT);
        const hash_pass = await bcrypt.hash(password, saltRound)

      
       

        const user = await Govt.create({ name,email, GovtDepartment , helpline ,password:hash_pass  })
       
    
        
        const token = jwt.sign({ email: user.email, type: "govt" }, process.env.JWT_KEY)

        res.status(200).json({ message: "user signup successfully", uid: token })

    }
    catch (err) {
        res.status(500).json({ message: "server internal error", err: err })
    }
}
)
router.post("/login", async(req,res)=>{
   
    try{
        let user = await Govt.findOne({email: req.body.email});
        if (!user) {
            return res
              .status(400)
              .json({  errors: "Try with correct Login credentials" });
          }
          let passwdchk = await bcrypt.compare(req.body.password, user.password);
          if (!passwdchk) {
            return res
              .status(400)
              .json({  errors: "Try with correct Login credentials" });
          }
          
          const token = jwt.sign({ email: user.email, type: "govt" }, process.env.JWT_KEY)
          res.status(200).json({ message: "user signup successfully", uid: token })
    }catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/get', fetchuser, async (req, res) => {
    try {
        const email = req.user.email;
        console.log(req.user , email);

        // Find the govt (Government) by email and exclude the password field
        const govt = await Govt.findOne({ email }, '-password');

        if (!govt) {
            return res.status(404).json({ msg: 'Government not found' });
        }

        // Find student, teacher, and dropout with .lean() to avoid circular structure
        const student = await Student.find({}).lean();
        const teacher = await Teacher.find({}).lean();
        const dropout = await Student.find({ isDropout: true }).lean();

        // Sending a response with all the data
        govt.student = student;
        govt.teacher= teacher
        govt.dropout= dropout
        govt.save()
        res.json(govt);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


  
  


module.exports = router;
