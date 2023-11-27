const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const userSchema = new Schema ({
    name:{
        type: String,

    },
    userEmail:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String
    },
  
     phone_number:{
       type:String,
          dafault:''
     },
 
      deleteFlag:{
        type:Boolean,
        default: false
    },
    gender:{
        type:String,
    },
    marital_status:{
        type:String,
    },
    hobbies:{
        type:String,

    },
    upload_resume:{
        type:String
    }

},{timestamps : true}
)

module.exports = mongoose.model("User_Register" , userSchema)