const express = require("express");
const cors = require("cors");

require("./db/mongoose");
const companyRoutes = require("./routes/company-routes");

// Create the server app and designate the port
const app = express();
const port = process.env.PORT || 5001;

// Register middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register individual custom routers
app.use("/api/companies", companyRoutes); // This url triggers companyRoutes

// Handling errors for unsupported routes
app.use((req, res, next) => {
  const error = new Error("Route not found");
  throw error;
});

// Register error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

// Start the server
app.listen(port, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log(`Server running on port: ${port}`);
});
