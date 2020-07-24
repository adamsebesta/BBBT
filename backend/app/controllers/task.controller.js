const db = require("../models");
const Tasks = db.tasks;
const Task = require('../models/task.model.js');

// Create and Save a new Task
exports.create = (req, res) => {
  const r = req.body;
  const task = new Task({
    description: r.description,
    estimation: r.estimation,
    status: r.status,
    project: r.project,
    assigned_workers: r.assigned_workers,
    tracked_hours: r.tracked_hours,
    category: r.category
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
  populate({
    path: 'assigned_workers.worker',
    model: 'Worker'
    }).
  exec((err, task) => {
    if (!task) {
      res.status(404).send({ message: "Not found Task with id " + id });
    }
    else res.send(task);
  })
}


// Update a Task by the id in the request
exports.update = (req, res) => {
  Task.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No task with _id=${id} found.`
        });
      } else res.send({ message: `Task updated successfully using the following values: ${req.body}` });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Task with id=" + id + ": " + err.message
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
