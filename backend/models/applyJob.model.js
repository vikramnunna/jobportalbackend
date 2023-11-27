const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const applyJobSchema = mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref :"User_Register"
    },
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref :"job"
    },
    userName:{
        type: String,

    },
    userEmail:{
        type:String,
        required: true,
        unique: true
    },
    phone_number:{
       type:String,
          dafault:''
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
    },
   
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

    },
    job_status: {
        type: Number,
        default: 0,

    }
   

  
},{
    timeStamps:true
})

module.exports = mongoose.model("applyjob", applyJobSchema)