/* This controller is to handle 
the CRUD operations */

const db = require("../models");
const Tutorial = db.tutorials; 

// Create and save a new Tutorial
exports.create = (req, res) =>{
    // Validate the request
    if(!req.body.title){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published: false
    });

    // Save a Tutorial in the database
    tutorial.save(tutorial).then(data => {
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "An error ocurred while creating the Tutorial"
        });
    });

};

// Retrieve all Tutorials by title
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Tutorial.find(condition).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "An error ocurred while retrieving the tutorials"
        });
    });
};

// Find a single Tutorial with an given id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id).then(data =>{
        if(!data){
            res.status(404).send({ message: "Not found Tutorial with id: " + id });
        }else{
            res.send(data);
        }
    }).catch(err =>{
        res.status(500).send({ message: "Error retrieving Tutorial with id: " + id });
    });
};

 // Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data =>{
        if(!data){
            res.status(404).send({
                message: `Can not update Tutorial with id: ${id}`
            });
        }else{
            res.send({ message: "Tutorial updated successfully!" });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating Tutorial with id: " + id
        });
    });
};

 // Delete a Tutorial with the specfied id in the request
exports.delete = (req,res) => {
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id).then(data =>{
        if(!data){
            res.status(404).send({
                message: `Can not delete Tutorial with id: ${id}`
            });
        }else{
            res.send({
                message: "Tutorial deleted successfully!"
            });
        }
    }).catch(err =>{
        res.status(500).send({
            message: "Error while deleting Tutorial with id: " + id
        });
    });
};

 // Delete all Tutorials from the database
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({}).then(data =>{
        res.send({
            message: `${data.deletedCount} Tutorials deleted successfully!`
        });
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "An error ocurred while removing all tutorials"
        });
    });
};

 // Find all published Tutorials, i.e, with published = true
exports.findAllPublished = (req, res) =>{
    Tutorial.find({published: true}).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "An error ocurred while retrieving tutorials"
        })
    })
};