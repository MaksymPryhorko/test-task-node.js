const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/api/users");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running.");
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

app.use("/api", usersRouter);

app.use((req, res) => res.status(404).json({ message: "Not found" }));

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error." } = err;
  res.status(status).json({ message });
});
