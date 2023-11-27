const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const adminSchema = mongoose.Schema({
    adminEmail:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String
    },
},{
    timeStamps:true
})

module.exports = mongoose.model("Admin", adminSchema)