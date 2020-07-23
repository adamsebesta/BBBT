const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = mongoose.Schema({
  name: String,
  code: String,
  fixed_budget: Boolean,
  budget: Number,
  buffer_percentage: Number,
  billing_rate: Number,
  start_date: Date,
  deadline: Date,
  client: { type: 'ObjectId', ref: 'Client' },
  workers: [
    {
      worker: { type: Schema.Types.ObjectId, ref: 'Worker' },
      factor: Number,
      hours_planned: Number
    }
  ],
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  task_categories: [String],
  task_statuses: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema, 'projects');
