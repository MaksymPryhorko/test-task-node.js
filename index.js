const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/api/users");
const app = express();
const mongoose = require("mongoose");
const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running.");
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.use(cors());
app.use("/", usersRouter);

app.use((req, res) => res.status(404).json({ message: "Not found" }));

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error." } = err;
  res.status(status).json({ message });
});
