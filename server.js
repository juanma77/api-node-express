// This help us to build REST APIs
const express = require("express");

// Helps to parse the requests and create the req.body object
const bodyParser = require("body-parser");

// To enable Express Middleware to enable CORS options
const cors = require("cors");

const app = express(); 

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Parse requests of content-type application/json
app.use(bodyParser.json());

//Parse requests of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Calling connect() method to connect to the DB
const db = require("./models");
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected successfully to the database!")
}).catch(err =>{
    console.log("Can not connect to the database", err);
    proccess.exit();
}); 

// Simple route to see at the start
app.get("/", (req,res) =>{
    res.json({ message: "Welcome to Juanma API CRUD application" });
});

// Include routes 
require("./routes/tutorial.routes")(app);

// Set port 
const PORT = process.env.PORT || 8080;

// Listen for requests
app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);
});