const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EstimationSchema = new Schema({
  time: Number,
  approved_via: String,
  approved_date: Date
});

const TaskSchema = mongoose.Schema({
  category: String,
  description: String,
  estimation: EstimationSchema,
  status: String,
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  assigned_workers: [
    {
      worker: { type: Schema.Types.ObjectId, ref: 'Worker' },
      tracked_hours: Number
    }
  ],
},
  { timestamps: true }
)

module.exports = mongoose.model('Task', TaskSchema, 'tasks');
