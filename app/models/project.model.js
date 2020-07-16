const mongoose = require('mongoose');

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
    // workers: [ workerDocument1,  workerDocument2, WorkerDocument3 ],
    // factors: {
    //     id1: 1.2,
    //     id2: 1.5,
    //     id3: 2
    // },
    // tasks: [ taskdocument1, taskdocument2 ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);


// const clientSchema = new Schema({
//     name: String
// })
//
// const Project = mongoose.model('Project', projectSchema);
// // const Client = mongoose.model('Client', clientSchema);
// // export default {Project, Client};
//
// module.exports = {
//     Project: Project
// }
