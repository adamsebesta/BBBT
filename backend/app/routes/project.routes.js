module.exports = app => {
  const projects = require("../controllers/project.controller.js");

  var router = require("express").Router();

  // Create a new Project
  router.post("/", projects.create);

  // Add a client to a project
  router.put("/updateClientInProject", projects.updateClient);

  // Retrieve all Projects
  router.get("/", projects.findAll);

  // Retrieve Project by PM
  router.get("/filtered/:worker_id", projects.findAllByPM) 

  // Retrieve a single Project with id
  router.get("/:id", projects.findOne);

  // Update a Project with id
  router.put("/:id", projects.update);

  // Delete a Project with id
  router.delete("/:id", projects.delete);

  // Create a new Project
  router.delete("/", projects.deleteAll);

  app.use('/api/projects', router);
};
