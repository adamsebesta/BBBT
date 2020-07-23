module.exports = app => {
  const projects = require("../controllers/project.controller.js");

  var router = require("express").Router();

  // Create a new Project
  router.post("/", projects.create);

  // update a field in a project
  router.put("/update", projects.updateField);

  // Add a client to a project
  router.put("/updateClient", projects.updateClient);

  // Add a task to a project
  router.put("/addTask", projects.addTask);

  // Retrieve all Projects
  router.get("/", projects.findAll);

  // Retrieve Project by PM
  router.get("/filtered/:worker_id", projects.findAllByPM) 

  // Retrieve a single Project with id
  router.get("/:id", projects.findOne);

  // Delete a Project with id
  router.delete("/:id", projects.delete);

  // Create a new Project
  router.delete("/", projects.deleteAll);

  app.use('/api/projects', router);
};
