const mongoose = require('mongoose');
const { type } = require('os');

const dropoutSchema = new mongoose.Schema({
  studentId: { 
    type: String, 
    required: true ,
    unique:true
  },

  studentname: { 
    type: String, 
    required:true
    
  },
  collegeOrSchoolName: { 
    type: String, 
    required:true
  },
  parentEmail: { 
    type: String, 
   
  },
  parentPhoneNumber: { 
    type: String, 
    
  },
  courseDuration: { 
    type: Number, 
    required: true 
  },
  classX:{type:Number ,  default:-1},
  classXII:{type:Number,  default:-1},
  gratution:{type:Number , default:-1 },
  healthissue:{type:String },
  previousFee:{type:Boolean},
  gender:{type:String},
  
  attendance: { 
    type: Number, 
    default:0
  },
  backlogs: { 
    type: Number, 
    default: 0 
  },
  behaviorRating: { 
    type: Number, 
    min: 1, 
    max: 10 
  },
  coursePursuing: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  studentPhoneNumber: { 
    type: String, 
    required: true 
  },
  isdropout:{type:Boolean , default:false},
  chancedropout:{type:Number , default:0},
  govtCoursesAvailed: [String],
  scholarshipsAvailed: [String],

  password:{
     type:String,
     required:true
  }
});

const Dropout = mongoose.model('Dropout', dropoutSchema);

module.exports = Dropout;
