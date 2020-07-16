const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.projects = require("./project.model.js")(mongoose);
// db.clients = require("./client.model.js")(mongoose);

module.exports = db;
