module.exports = app => {
  const projects = require("../controllers/project.controller.js");

  var router = require("express").Router();

  // Create a new Project
  router.post("/", projects.create);

  // Add a client to a project
  router.put("/updateClientInProject", projects.updateClient);

  // Retrieve all Projects
  router.get("/", projects.findAll);

  // Retrieve all published Tutorials
  router.get("/published", projects.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", projects.findOne);

  // Update a Tutorial with id
  router.put("/:id", projects.update);

  // Delete a Tutorial with id
  router.delete("/:id", projects.delete);

  // Create a new Tutorial
  router.delete("/", projects.deleteAll);

  app.use('/api/projects', router);
};
