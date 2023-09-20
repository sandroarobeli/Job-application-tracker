const { validationResult } = require("express-validator");

const Company = require("../models/company-model");

// List all Companies
const listAllCompanies = async (req, res, next) => {
  try {
    let companies = await Company.find({});
    res.set("Cache-Control", "no-cache");
    res.status(200).json({ companies: companies.reverse() });
  } catch (error) {
    return next(
      new Error("Unable to retrieve companies. Please try again later.")
    );
  }
};

// Add a new Company
const addNewCompany = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new Error("Company name is required!"));
  }
  const { name, comments } = req.body;
  try {
    const newCompany = new Company({
      name,
      date: new Date().toDateString().slice(4),
      rejected: false,
      comments,
    });
    await newCompany.save();
    res.set("Cache-Control", "no-cache");
    res.status(201).json({ company: newCompany });
  } catch (error) {
    return next(new Error("Failed to add new company. Please try again later"));
  }
};

// Edit company
const editCompany = async (req, res, next) => {
  const { id, name, rejected, comments } = req.body;

  try {
    const editedCompany = await Company.findByIdAndUpdate(
      id,
      { name, rejected, comments },
      { new: true }
    );
    res.set("Cache-Control", "no-cache");
    res.status(200).json({ company: editedCompany });
  } catch (error) {
    return next(new Error(`Failed to edit: ${error.message}`));
  }
};

// Delete company
const deleteCompany = async (req, res, next) => {
  const { id } = req.body;
  try {
    const deletedCompany = await Company.findByIdAndDelete(id);
    res.status(200).json({ company: deletedCompany });
  } catch (error) {
    return next(new Error("Failed to delete. Please try again later."));
  }
};

exports.listAllCompanies = listAllCompanies;
exports.addNewCompany = addNewCompany;
exports.deleteCompany = deleteCompany;
exports.editCompany = editCompany;
