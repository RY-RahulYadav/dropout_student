
const mongoose = require('mongoose');
const { type } = require('os');

const collegeSchema = new mongoose.Schema({
    collegeId: {
        type: String,
        required: true
    },
    email:{type:String , require:true},
    name: {
        type: String,
        required: true
    },
    department:{type:String  , required:true},
    allcousre: [{
        coursename: String,
        teacherIncharge: String,
        teacheremail: String,
        teacherphone: String,
    }],
    collegeType:{type:String},
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        default: []
    }],
    teacher:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        default: []
    }],
    password: {
        type: String,
        required: true
    }
});

const College = mongoose.model('College', collegeSchema);

module.exports = College;
