const express = require("express");
const router = express.Router();
const Scholarship = require("../model/scholarship.schema");
require("dotenv").config();
const fetchuser = require("../middleware/fetchuser");

router.get("/allscholarship", async (req, res) => {
  try {
    let scholarship = await Scholarship.find({});
    if (!scholarship || scholarship.length === 0) {
      return res.status(400).json({ errors: "No scholarship available" });
    }
    res.status(200).json({ scholarship: scholarship });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/addscholarship", async (req, res) => {
  try {
    const { name, amount, requirements, documents, category } = req.body;
    if (!name || !amount || !requirements || !documents || !category) {
      return res.status(400).json({ message: "Input missing" });
    }
    const scholarship = await Scholarship.findOne({ name });

    if (scholarship) {
      return res.status(400).json({ message: "Already Present scholarship" });
    }
    const scholar = await Scholarship.create({
      name,
      amount,
      requirements,
      documents,
      category,
    });
    res.status(200).json({
      message: "scholarship Added Successfully",
      scholarship: scholar,
    });
  } catch (error) {
    res.status(500).json({ message: "server internal error", error: error });
  }
});

module.exports = router;
