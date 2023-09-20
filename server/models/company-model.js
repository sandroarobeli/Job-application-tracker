const mongoose = require("mongoose");

// Define Company Schema
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  comments: {
    type: String,
    trim: true,
  },
});

// Define Company class per its Schema (Blueprint)
const Company = mongoose.model("Company", companySchema);

module.exports = Company;
