const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const applyJob = require("../models/applyJob.model")

const user = require("../models/userSignUp.model")

const job  = require("../models/job.model")

exports.applyForJob=async(req,res)=>{
    let userId = req.params.userId;
    let jobId = req.params.jobId;

    try {

        let userData = await user.findOne({_id: userId});

        let jobData = await job.findOne({_id: jobId});

        let data  = await applyJob.create({
            userId:userId,
            jobId:jobId,
            userName:userData.name,
            userEmail:userData.userEmail,
            phone_number:userData.phone_number,
            gender:userData.gender,
            marital_status:userData.marital_status,
            hobbies:userData.hobbies,
            title:jobData.title,
            description:jobData.description,
            category:jobData.category,
            subCategory:jobData.subCategory,
            salaryRange:jobData.salaryRange,
            jobType:jobData.jobType,
            jobLocation:jobData.jobLocation,
        })
return res.status(200).send({data: data , message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})
    }
}