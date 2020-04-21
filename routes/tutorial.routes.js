/* These are the routes to handle 
the request from the client */
module.exports = app =>{
    const tutorials = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", tutorials.create);

    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);

    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);

    // Retrieve a single Tutorial with a given id
    router.get("/:id", tutorials.findOne);

    // Update a Tutorial with an id
    router.put("/:id", tutorials.update);

    // Delete a Tutorial with an id
    router.delete("/:id", tutorials.delete);

    // Create a new Tutorial
    router.delete("/", tutorials.deleteAll);

    app.use('/api/tutorials', router); 
}