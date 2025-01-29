const fs = require('fs');
const mongoose = require('mongoose');
const Student = require("../model/student.schema");
const csv = require('fast-csv');
const tf = require('@tensorflow/tfjs');
const path = require('path');

const express = require("express");
const router = express.Router();

const csvPath = path.join(__dirname, '../data.csv');
console.log(csvPath);

async function getStudentData() {
  try {
    const students = await Student.find({}); // Fetch dropout students
    return students;
  } catch (error) {
    console.error("Error fetching student data:", error);
  }
}

function deleteModelIfExists(modelPath) {
  if (fs.existsSync(modelPath)) {
    fs.rmdirSync(modelPath, { recursive: true });
    console.log('Previous model deleted.');
  }
}

async function fetchStudentData() {
  try {
    const students = await getStudentData();
    return students;
  } catch (error) {
    console.error("Error fetching student data:", error);
    return [];
  }
}

async function processCSV() {
  const studentData = await fetchStudentData();
  
  const studentArray = studentData?.map(student => ({
    Attendance: student.attendance,
    BehaviorRating: student.behaviorRating,
    Class10Marks: student.classX, 
    Class11Marks: student.classXII, 
    GraduationMarks: student.gratution, 
    HealthIssues: student.healthissue === "Yes" ? 1 : 0,
    FamilyIncome: student.familyincome,
    PreviousFeePaid: student.previousFee === "Yes" ? 1 : 0,
    Backlog: student.backlogs,
    Gender: student.gender,
    EducationLoan: student.educationLoan === "Yes" ? 1 : 0,
    DropoutChance: student.isdropout === "Yes" ? 1 : 0,
  }));

  const rows = [];

  fs.createReadStream(csvPath)
    .pipe(csv.parse({ headers: true }))
    .on('data', row => rows.push(row))
    .on('end', async () => {
      rows.push(...studentArray);

      // Remove rows from the top equal to the number of students added
      rows.splice(0, studentArray.length);

      // Overwrite the existing CSV file with updated data
      const writeStream = fs.createWriteStream(csvPath); // Reuse the same path
      const csvStream = csv.format({ headers: true });

      writeStream.on('finish', () => {
        console.log('CSV file has been updated.');
      });

      csvStream.pipe(writeStream);
      rows.forEach(row => csvStream.write(row));
      csvStream.end();
    });
}

async function trainModel() {
  try {
    // Load and process CSV
    const filePath = path.resolve(__dirname, csvPath);
    console.log(`Reading file from: ${filePath}`);

    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    console.log('File content loaded successfully.');

    // Parse CSV content
    const data = [];
    csv.parseString(fileContent, { headers: true, skipEmptyLines: true })
      .on('data', row => data.push(row))
      .on('end', () => {
        console.log(`Parsed ${data.length} rows.`);
        processAndTrainModel(data);
      });

  } catch (error) {
    console.error('Error reading or parsing the CSV file:', error);
  }
}

function processAndTrainModel(data) {
  try {
    if (data.length === 0) {
      console.error('No data found in the CSV file.');
      return;
    }

    // Extract features and labels
    const features = data.map(row => [
      parseFloat(row.Attendance) || 0,
      parseFloat(row.BehaviorRating) || 0,
      parseFloat(row.Class10Marks) || 0,
      parseFloat(row.Class11Marks) || 0,
      parseFloat(row.GraduationMarks) || 0,
      parseFloat(row.HealthIssues) || 0,
      parseFloat(row.FamilyIncome) || 0,
      parseFloat(row.PreviousFeePaid) || 0,
      parseFloat(row.Backlog) || 0,
      parseFloat(row.Gender) || 0,
      parseFloat(row.EducationLoan) || 0,
    ]);

    const labels = data.map(row => parseFloat(row.DropoutChance) || 0);

    // Check for any missing values
    if (features.some(f => f.includes(NaN))) {
      console.error('Some features contain NaN values.');
      return;
    }
    if (labels.includes(NaN)) {
      console.error('Some labels contain NaN values.');
      return;
    }

    const xs = tf.tensor2d(features);
    const ys = tf.tensor2d(labels, [labels.length, 1]);

    // Define the ANN model
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [features[0].length] }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

    model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

    // Train the model
    console.log('Starting model training...');
    model.fit(xs, ys, { epochs: 10, batchSize: 32 })
      .then(() => {
        console.log('Training done.');

        const modelSaveDir = path.join(__dirname, '../drop');
        if (!fs.existsSync(modelSaveDir)) {
          fs.mkdirSync(modelSaveDir, { recursive: true });
        }

        model.save(`${modelSaveDir}`).then(() => {
          console.log('Model saved to', modelSaveDir);
        }).catch(err => {
          console.error('Error saving the model:', err);
        });
      })
      .catch(err => {
        console.error('Error during model training:', err);
      });

  } catch (error) {
    console.error('Error processing and training the model:', error);
  }
}

// Define the route to train the model
router.get('/train-model', async (req, res) => {
  try {
    // await processCSV();
    await trainModel();
    res.status(200).send('Model training completed successfully.');
  } catch (error) {
    console.error('Error training the model:', error);
    res.status(500).send('Error training the model.');
  }
});

module.exports = router;
