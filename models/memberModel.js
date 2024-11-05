const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {type: String, required: true},
    party: {type: String, required: true},
    position: { type: String, required: true, enum: ["Chairman", "Minister"] },
    employmentDate: {type: Date, required: true}
})

module.exports = mongoose.model('Member', memberSchema);