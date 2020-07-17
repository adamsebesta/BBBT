const db = require("../models");
const Clients = db.clients;
const Client = require('../models/client.model.js');

// Create a new Client
exports.create = (req, res) => {
  const client = new Client({
    name: req.body.name
  });

  client
    .save(client)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Client."
      });
    });
};

// Find all Client
exports.findAll = (req, res) => {
  Client.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Client."
      });
    });
};

// Find a client by ID
exports.findOne = (req, res) => {
const id = req.params.id;
return Client.findById(id)
  .exec((err, client) => {
    if (!client) {
      res.status(404).send({ message: "Not found Client with id " + id });
    }
    else res.send(client);
  })
}


// Update a Client by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
  return res.status(400).send({
    message: "Data to update can not be empty!"
  });
}

const id = req.params.id;

Client.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update Client with id=${id}. Maybe Client was not found!`
      });
    } else res.send({ message: "Client was updated successfully." });
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Client with id=" + id
    });
  });

};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

Client.findByIdAndRemove(id)
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Client with id=${id}. Maybe Client was not found!`
      });
    } else {
      res.send({
        message: "Client was deleted successfully!"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Client with id=" + id
    });
  });
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
  Client.deleteMany({})
   .then(data => {
     res.send({
       message: `${data.deletedCount} Clients were deleted successfully!`
     });
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while removing all tutorials."
     });
   });

};
