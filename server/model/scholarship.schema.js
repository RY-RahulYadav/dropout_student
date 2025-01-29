const mongoose = require('mongoose');
const { type } = require('os');

const scholarshipSchema = new mongoose.Schema({
name: { 
    type: String, 
    required:true,
    unique: true  
  },
  amount: { 
    type: Number, 
    required:true
  },
  requirements: { 
    type: String, 
    required: true
  },
  documents: { 
    type: String, 
    required: true
  },
  category: { 
    type: String, 
    required: true 
  },
});

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

module.exports = Scholarship;
