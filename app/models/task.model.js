const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackedHoursSchema = new Schema({ name: Number });
const EstimationSchema = new Schema({
  time: Number,
  approved_via: String,
  approved_date: Date
});

const TaskSchema = mongoose.Schema({
  description: String,
  estimation: EstimationSchema,
  status: String,
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  assigned_workers: [{type: Schema.Types.ObjectId, ref: 'Workers'}],
  tracked_hours: TrackedHoursSchema
},
  { timestamps: true }
)

module.exports = mongoose.model('Task', TaskSchema, 'tasks');
