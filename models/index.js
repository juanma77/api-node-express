const dbConfig = require("../config/db.config.js");

const mongoose = require("moongose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose; 
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);

module.exports = db;
