const express = require("express");

const {
  listAllCompanies,
  addNewCompany,
  deleteCompany,
  editCompany,
} = require("../controllers/company-controllers");

// Initializing the router object
const router = express.Router();

// List all Companies
router.get("/", listAllCompanies);

// Add a new Company
router.post("/", addNewCompany);

// Edit Company
router.patch("/", editCompany);

// Delete Company
router.delete("/", deleteCompany);

module.exports = router;
