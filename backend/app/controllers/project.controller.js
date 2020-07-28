const db = require("../models");
const Projects = db.projects;
const Project = require('../models/project.model.js');

const defaultTaskCategories = [
  "Design",
  "Frontend dev",
  "Backend dev",
  "Project management"
]

const defaultTaskStatuses = [
  "Todo",
  "In progress",
  "Final stages",
  "Done",
  "Ongoing"
]

// create a new project
exports.create = (req, res) => {
  const r = req.body;
  const project = new Project({
    name: r.name,
    code: r.code,
    budget: r.budget,
    fixed_budget: r.fixed_budget,
    buffer_percentage: r.buffer_percentage,
    billing_rate: r.billing_rate,
    start_date: r.start_date,
    deadline: r.deadline,
    client: r.client,
    workers: r.workers,
    tasks: r.tasks,
    task_categories: defaultTaskCategories,
    task_statuses: defaultTaskStatuses
  })

  project
    .save(project)
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

// Find all Projects
exports.findAll = (req, res) => {
  Project.find()
  .populate('client')
  .populate({
    path: 'tasks',
    populate: {
      path: 'assigned_workers',
      populate: {
        path: 'worker',
        model: 'Worker'}
    }
   })
  .exec((err, project) => {
    if (!project) {
      res.status(404).send({ message: "Error fetching projects" });
    }
    else res.send(project);
  })
};

// Find one Project by ID
exports.findOne = (req, res) => {
const id = req.params.id;
return Project.findById(id)
  .populate('workers.worker')
  // .populate('tasks')
  .populate({
    path: 'tasks',
    populate: {
      path: 'assigned_workers',
      populate: {
        path: 'worker',
        model: 'Worker'}
    }
   })
  .populate('client')
  .exec((err, project) => {
    if (!project) {
      res.status(404).send({ message: "Not found Project with id " + id });
    }
    else res.send(project);
  })
}

// add a task category to a project
exports.addTaskCategory = (req, res) => {
  Project.findByIdAndUpdate(req.body.projectId, {$push: {"task_categories": req.body.task_category}}, (err, result) => {
    if(err){
      res.send(err)
    } else {
      res.send('task category ' + req.body.task_category +  ' added')
    }
  })
}

// remove a task category from a project
exports.removeTaskCategory = (req, res) => {
  Project.findByIdAndUpdate(req.body.projectId, {$pull: {"task_categories": req.body.task_category}}, (err, result) => {
    if(err){
      res.send(err)
    } else {
      res.send('task category ' + req.body.task_category +  ' removed')
    }
  })
}

// add a task status to a project
exports.addTaskStatus = (req, res) => {
  Project.findByIdAndUpdate(req.body.projectId, {$push: {"task_statuses": req.body.task_status}}, (err, result) => {
    if(err){
      res.send(err)
    } else {
      res.send('task status ' + req.body.task_category +  ' added')
    }
  })
}

// remove a task status from a project
exports.removeTaskStatus = (req, res) => {
  Project.findByIdAndUpdate(req.body.projectId, {$pull: {"task_statuses": req.body.task_status}}, (err, result) => {
    if(err){
      res.send(err)
    } else {
      res.send('task status ' + req.body.task_category +  ' removed')
    }
  })
}

// add a task to a project
exports.addTask = (req, res) => {
  Project.findByIdAndUpdate(req.body.projectId, {
    $push: {
      "tasks": req.body.taskId
    },
  }, (err, result) => {
    if(err){
      res.send(err)
    } else {
      res.send('task ' + req.body.taskId +  ' added')
    }
  })
}

// remove a task from a project
exports.removeTask = (req, res) => {
  Project.findByIdAndUpdate(req.body.projectId, {$pull: {"tasks": req.body.taskId}}, (err, result) => {
    if(err){
      res.send(err)
    } else {
      res.send('task ' + req.body.taskId +  ' removed')
    }
  })
}

// Update a Project by the id in the request
exports.updateField = (req, res) => {
  var updateObj = new Object;
  updateObj[req.body.fieldToUpdate] = req.body.value;

  Project.findByIdAndUpdate(req.body.projectId, updateObj, (err, result) => {
    if(err){
      res.send(err)
    } else {
      res.send('updated')
    }
  })
}

// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

Project.findByIdAndRemove(id)
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
      });
    } else {
      res.send({
        message: "Project was deleted successfully!"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Project with id=" + id
    });
  });
};

// Delete all Projects from the database.
exports.deleteAll = (req, res) => {
  Project.deleteMany({})
   .then(data => {
     res.send({
       message: `${data.deletedCount} Projects were deleted successfully!`
     });
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while removing all tutorials."
     });
   });

};
