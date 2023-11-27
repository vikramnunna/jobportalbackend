const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const jobSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,

    },
    subCategory: {
        type: String,

    },
    salaryRange: {
        type: Number,

    },
    jobType: {
        type: String,

    },
    jobLocation: {
        type: String,

    }
}, {
    timeStamps: true
})

module.exports = mongoose.model("job", jobSchema)