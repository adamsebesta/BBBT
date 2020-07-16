const db = require("../models");
const Clients = db.clients;
const Client = require('../models/client.model.js');


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


exports.findAll = (req, res) => {

};


exports.findOne = (req, res) => {

};


exports.update = (req, res) => {

};


exports.delete = (req, res) => {

};


exports.deleteAll = (req, res) => {

};


exports.findAllPublished = (req, res) => {

};
