const db = require("../models");
const Projects = db.projects;
const Clients = db.clients;
const Project = require('../models/project.model.js');
const Client = require('../models/client.model.js');

// Create and Save a new Tutorial
exports.create = (req, res) => {
  const project = new Project({
    name: req.body.name,
    code: req.body.code,
    fixed_budget: req.body.fixed_budget,
    buffer_percentage: req.body.buffer_percentage,
    billing_rate: req.body.billing_rate,
    start_date: req.body.start_date,
    deadline: req.body.deadline,
    client: req.body.client,
    // workers: req.body.workers,
    // factors: req.body.factors,
    // tasks: req.body.tasks
  });

  project
    .save(project)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    });
};

// add a client to a project
exports.updateClient = (req, res) => {
  Project.findByIdAndUpdate(req.body.projectId, {"client": req.body.clientId}, (err, result) => {
    if(err){
      res.send(err)
    } else {
      res.send('updated')
    }
  })
}

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};
