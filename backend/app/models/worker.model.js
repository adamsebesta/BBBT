const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const WorkerSchema = mongoose.Schema({
    rate_brutto: Number,
    first_name: String,
    last_name: String,
    internal: Boolean,
  },
  { timestamps: true }
)

module.exports = mongoose.model('Worker', WorkerSchema, 'workers');
