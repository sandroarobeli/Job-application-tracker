const Company = require("../models/company-model");

// List all Companies
const listAllCompanies = async (req, res, next) => {
  try {
    let companies = await Company.find({});
    res.status(200).json({ companies: companies.reverse() });
  } catch (error) {
    return next(new Error(`Unable to retrieve companies: ${error.message}`));
  }
};

// Add a new Company
const addNewCompany = async (req, res, next) => {
  const { name, comments } = req.body;
  try {
    const newCompany = new Company({
      name,
      date: new Date().toDateString().slice(4),
      status: true,
      comments,
    });
    await newCompany.save();
    res.status(201).json({ company: newCompany });
  } catch (error) {
    return next(new Error(`Failed to add new company: ${error.message}`));
  }
};

// Edit company
const editCompany = async (req, res, next) => {
  const { id, name, status, comments } = req.body;
  try {
    const editedCompany = await Company.findByIdAndUpdate(
      id,
      { name, status, comments },
      { new: true }
    );
    res.status(200).json({ company: editedCompany });
  } catch (error) {
    return next(new Error(`Failed to delete: ${error.message}`));
  }
};

// Delete company
const deleteCompany = async (req, res, next) => {
  const { id } = req.body;
  try {
    const deletedCompany = await Company.findByIdAndDelete(id);
    res.status(200).json({ company: deletedCompany });
  } catch (error) {
    return next(new Error(`Failed to delete: ${error.message}`));
  }
};

exports.listAllCompanies = listAllCompanies;
exports.addNewCompany = addNewCompany;
exports.deleteCompany = deleteCompany;
exports.editCompany = editCompany;
