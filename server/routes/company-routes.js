const express = require("express");
const { check } = require("express-validator");

const {
  listAllCompanies,
  addNewCompany,
  deleteCompany,
  editCompany,
} = require("../controllers/company-controllers");

const router = express.Router();

// List all Companies
router.get("/", listAllCompanies);

// Add a new Company
router.post(
  "/",
  [check("name").not().isEmpty().trim().escape()],
  addNewCompany
);

// Edit Company
router.patch("/", editCompany);

// Delete Company
router.delete("/", deleteCompany);

module.exports = router;
