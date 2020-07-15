import {Project} from './models/Project.js';

const mongoose = require('mongoose');
const uri = 'mongodb+srv://adam:adam@bbbt.5p7u8.mongodb.net/BBBT?retryWrites=true&w=majority';
mongoose.connect(uri, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('it\'s alive!');
});

const AuctionLive = new Project({
    name: 'AuctionLive',
    code: '2020_145',
    fixed_budget: true, 
    budget: 14500,
    buffer_percentage: 20,
    billing_rate: 75,
    start_date: new Date(Date.now()),
    deadline: new Date(Date.now())
})

console.log(JSON.stringify(AuctionLive));
