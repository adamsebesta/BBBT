
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const dotenv = require("dotenv");
dotenv.config();

var corsOptions = {
  origin: "http://localhost:8081"
};

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to BBBT." });
});

// set port, listen for requests
require("./app/routes/project.routes")(app);
require("./app/routes/client.routes")(app);
require("./app/routes/task.routes")(app);
require("./app/routes/worker.routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
