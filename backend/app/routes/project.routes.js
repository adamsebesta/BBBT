module.exports = app => {
  const projects = require("../controllers/project.controller.js");

  var router = require("express").Router();

  // Create a new Project
  router.post("/", projects.create);

  // update a field in a project
  router.put("/update", projects.updateField);

  // add a task to a project
  router.put("/addTask", projects.addTask);

  // remove a task from a project
  router.put("/removeTask", projects.removeTask);

  // add a task status to a project
  router.put("/addTaskStatus", projects.addTaskStatus);

  // remove a task status from a project
  router.put("/removeTaskStatus", projects.removeTaskStatus);

  // add a task category to a project
  router.put("/addTaskStatus", projects.addTaskCategory);

  // remove a task category from a project
  router.put("/removeTaskStatus", projects.removeTaskCategory);

  // Retrieve all Projects
  router.get("/", projects.findAll);

  // Retrieve a single Project with id
  router.get("/:id", projects.findOne);

  // Delete a Project with id
  router.delete("/:id", projects.delete);

  // Delete all projects from the DB
  router.delete("/", projects.deleteAll);

  app.use('/api/projects', router);
};
