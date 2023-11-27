const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const categorySchema = mongoose.Schema({

    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref :"category"
    },
    subCategory:{
        type: String,
        required: [true, "Please Enter category"],
        unique: [
          true,
          "Please add unique category",
        ],
    },
    categoryName:{
        type: String,
    },
   

  
},{
    timeStamps:true
})

module.exports = mongoose.model("sub_Category", categorySchema)