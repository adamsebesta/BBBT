module.exports = app => {
  const workers = require("../controllers/worker.controller.js");

  var router = require("express").Router();

  // Create a new Worker
  router.post("/", workers.create);

  // Retrieve all Workers
  router.get("/", workers.findAll);

  // Retrieve all PM's
  router.get("/pm", workers.findAllPM);

  // Retrieve a single Worker with id
  router.get("/:id", workers.findOne);

  // Update a Worker with id
  router.put("/:id", workers.update);

  // Delete a Worker with id
  router.delete("/:id", workers.delete);

  // Create a new Worker
  router.delete("/", workers.deleteAll);

  app.use('/api/workers', router);
};
