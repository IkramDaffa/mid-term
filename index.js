require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

// connect to database
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("connected to databse");
});

//routes
const routes = require("./routes/routes");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

// running in port 3000
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
