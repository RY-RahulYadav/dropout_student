
const mongoose = require('mongoose');
const { type } = require('os');

const govtSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    GovtDepartment: {
        type: String,
        required: true
    },
    helpline: {
        type: String,
        require: true
    },

    student: [],

    teacher: [],
    dropout: [],
    additionCousre: [{ cousrename: String, desc: String, link:String }],
    Schrolship: [{ SchrolshipName: String, desc: String, link: String }],
    password: {
        type: String,
        required: true
    }
});

const Govt = mongoose.model('Govt', govtSchema);

module.exports = Govt;