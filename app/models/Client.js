const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: String
})

module.exports = mongoose.model('Client', clientSchema);