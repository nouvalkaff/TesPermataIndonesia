const express = require("express");
// const cors = require("cors");

require("dotenv").config();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const userRoutes = require("./routes/userRoutes");

// app.use(cors({ origin: "*" }));

app.use("/permata", userRoutes);

app.all("/", (req, res) => {
  res.status(200).send({
    code: 200,
    statustext: "OK",
    success: true,
    message: "Welcome to API Permata Indonesia",
  });
});

app.all("*", (req, res) =>
  res.status(400).send({
    code: 400,
    statustext: "Bad Request",
    success: false,
    message: "Route not found. Please double check your route again.",
  })
);

const PORT = process.env.PORT || 1927;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
