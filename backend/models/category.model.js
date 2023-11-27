const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const categorySchema = mongoose.Schema({
    category:{
        type: String,
        required: [true, "Please Enter category"],
        unique: [
          true,
          "Please add unique category",
        ],
    },
   
  
},{
    timeStamps:true
})

module.exports = mongoose.model("category", categorySchema)