const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const job = require("../models/job.model")


exports.addJobs = async(req,res) => {
  try {
    const {title,description,category,subCategory,salaryRange,jobType,jobLocation} = req.body;

    if(!title || !description || !category || !subCategory || !salaryRange || !jobType || !jobLocation){
        return res.status(400).send({message:"All field are required",status:400})
    }

    let data = await job.create({
        title:title,
        description:description,
        category:category,
        subCategory:subCategory,
        salaryRange:salaryRange,
        jobType:jobType,
        jobLocation:jobLocation

    })
return res.status(200).send({data:data,message:"Success",status:200})
  } catch (error) {
    return res.status(500).send({message:error.message,status:500})
  }
}


exports.getJobs = async(req,res) =>{
    let id = req.params.id;
try {
    let data = await job.findOne({_id:id})

    if(data.length === 0){
        return res.status(404).send({message:"No jobs found",status:404})
    }

    return res.status(200).send({data:data,message:"Success",status:200})
} catch (error) {
    return res.status(500).send({message:error.message,status:500})

}
}

exports.updateJobDetails = async(req,res)=>{
 

try {
    let id = req.params.id;
    const {title,description,category,subCategory,salaryRange,jobType,jobLocation} = req.body;

    if(!title || !description || !category || !subCategory || !salaryRange || !jobType || !jobLocation){
        return res.status(400).send({message:"All field are required",status:400})
    }

    let data = await job.findOneAndUpdate({
        _id:id
    },{
        $set: {
            title:title,
            description:description,
            category:category,
            subCategory:subCategory,
            salaryRange:salaryRange,
            jobType:jobType,
            jobLocation:jobLocation
        }
    },{new:true})

    return res.status(200).send({data:data,message:"Success",status:200});
} catch (error) {
    return res.status(500).send({message:error.message,status:500})

}
}


exports.deleteJob = async (req, res) => {
    let id = req.params.id;

   try {
   let data = await job.findOneAndDelete({
        _id:id
       },{ new: true})
 
       res.status(200).json({message: "Deleted  job successfully", "status": 200} )
   } catch (error) {
       res.status(500).send({ message: error.message, "status": 500 })

   }
}
