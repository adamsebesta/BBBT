const db = require("../models");
const Tasks = db.tasks;
const Task = require('../models/task.model.js');

// Create and Save a new Task
exports.create = (req, res) => {
  const task = new Task({
    description: req.body.description,
    estimation: req.body.estimation,
    status: req.body.status,
    project: req.body.project,
    workers: req.body.workers,
    tracked_hours: req.body.tracked_hours
  });

  task
    .save(task)
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

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {

};


exports.findOne = (req, res) => {
const id = req.params.id;
return Task.findById(id).
  populate('project').
  populate('workers').
  exec((err, task) => {
    if (!task) {
      res.status(404).send({ message: "Not found Task with id " + id });
    }
    else res.send(task);
  })
}


// Update a Task by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
  return res.status(400).send({
    message: "Data to update can not be empty!"
  });
}

const id = req.params.id;

Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update Task with id=${id}. Maybe Task was not found!`
      });
    } else res.send({ message: "Task was updated successfully." });
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Task with id=" + id
    });
  });

};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

Task.findByIdAndRemove(id)
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
      });
    } else {
      res.send({
        message: "Task was deleted successfully!"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Task with id=" + id
    });
  });
};

// Delete all Tasks from the database.
exports.deleteAll = (req, res) => {
  Task.deleteMany({})
   .then(data => {
     res.send({
       message: `${data.deletedCount} Tasks were deleted successfully!`
     });
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while removing all tutorials."
     });
   });

};
