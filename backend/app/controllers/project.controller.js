const db = require("../models");
const Projects = db.projects;
const Project = require('../models/project.model.js');

// Create and Save a new Tutorial
exports.create = (req, res) => {
  const r = req.body;
  const project = new Project({
    name: r.name,
    code: r.code,
    budget: r.budget,
    fixed_budget: r.fixed_budget,
    buffer_percentage: r.buffer_percentage,
    billing_rate: r.billing_rate,
    start_date: r.start_date,
    deadline: r.deadline,
    client: r.client,
    workers: r.workers,
    tasks: r.tasks
  })

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

// Find all Projects
exports.findAll = (req, res) => {
  Project.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Projects."
      });
    });
};

// Find one Project by ID
exports.findOne = (req, res) => {
const id = req.params.id;
return Project.findById(id)
  .populate('workers.worker')
  // .populate('tasks')
  .populate({
    path: 'tasks',
    populate: {
      path: 'assigned_workers', 
      populate: {
        path: 'worker', 
        model: 'Worker'}
    }
   })
  .populate('client')
  .exec((err, project) => {
    if (!project) {
      res.status(404).send({ message: "Not found Project with id " + id });
    }
    else res.send(project);
  })
}


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

// Update a Project by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
  return res.status(400).send({
    message: "Data to update can not be empty!"
  });
}

const id = req.params.id;

Project.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update Project with id=${id}. Maybe Project was not found!`
      });
    } else res.send({ message: "Project was updated successfully." });
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Project with id=" + id
    });
  });

};

// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

Project.findByIdAndRemove(id)
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
      });
    } else {
      res.send({
        message: "Project was deleted successfully!"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Project with id=" + id
    });
  });
};

// Delete all Projects from the database.
exports.deleteAll = (req, res) => {
  Project.deleteMany({})
   .then(data => {
     res.send({
       message: `${data.deletedCount} Projects were deleted successfully!`
     });
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while removing all tutorials."
     });
   });

};
