const db = require("../models");
const Workers = db.workers;
const Worker = require('../models/worker.model.js');

// Create and Save a new Worker
exports.create = (req, res) => {
  const r = req.body;
  const worker = new Worker({
    rate_brutto: r.rate_brutto,
    first_name: r.first_name,
    last_name: r.last_name,
    internal: r.internal,
  });

  worker
    .save(worker)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Worker."
      });
    });
};

// Retrieve all Workers from the database.
exports.findAll = (req, res) => {
  Worker.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Workers."
      });
    });
};

exports.findOne = (req, res) => {
const id = req.params.id;
return Worker.findById(id)
  .exec((err, worker) => {
    if (!worker) {
      res.status(404).send({ message: "Not found Worker with id " + id });
    }
    else res.send(worker);
  })
}


// Update a Worker by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
  return res.status(400).send({
    message: "Data to update can not be empty!"
  });
}

const id = req.params.id;

Worker.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update Worker with id=${id}. Maybe Worker was not found!`
      });
    } else res.send({ message: "Worker was updated successfully." });
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Worker with id=" + id
    });
  });

};

// Delete a Worker with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

Worker.findByIdAndRemove(id)
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Worker with id=${id}. Maybe Worker was not found!`
      });
    } else {
      res.send({
        message: "Worker was deleted successfully!"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Worker with id=" + id
    });
  });
};

// Delete all Workers from the database.
exports.deleteAll = (req, res) => {
  Worker.deleteMany({})
   .then(data => {
     res.send({
       message: `${data.deletedCount} Workers were deleted successfully!`
     });
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while removing all tutorials."
     });
   });

};
