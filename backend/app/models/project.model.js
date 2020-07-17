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
  workers: [{ type: Schema.Types.ObjectId, ref: 'Worker' }],
  factors: [{ type: Schema.Types.ObjectId, ref: 'Worker' }],
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema, 'Projects');