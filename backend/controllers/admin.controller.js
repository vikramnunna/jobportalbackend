const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config")
const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const admin = require("../models/admin.model")
const user = require("../models/userSignUp.model")
const applyJob = require("../models/applyJob.model")
const category = require("../models/category.model")
const jobs = require("../models/job.model")


function generateToken(userid) {
    return jwt.sign({ id: userid }, config.secret, { expiresIn: 15552000 });
}

exports.adminSignUp = async (req, res) => {
 
    let adminEmail = req.body.adminEmail ? req.body.adminEmail : '';

    let password = req.body.password ? req.body.password : '';
   
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    try {
      
            if (adminEmail === null || adminEmail === '') {
                res.status(400).send({ message: "adminEmail is required", "status": 400 });

            } else {
                if (!adminEmail.match(mailformat)) {
                    res.status(400).send({ message: "adminEmail is not in correct form", "status": 400 });

                } else {
                    if (password === null || password === '') {
                        res.status(400).send({ message: "adminEmail is required", "status": 400 });

                    }

                }
            }
        

        
    

        let data = await admin.create({ 
        
            adminEmail:adminEmail.toLowerCase(),
          
            password:bcrypt.hashSync(password, 8)

        })
      return  res.status(200).send({data:data,message:"Admin signUp successfuly", "status":200})
    } catch (error) {
       return res.status(500).send({message:error.message, "status":500})
    }
}

exports.adminLogin = async (req, res) => {
    let adminEmail = req.body.adminEmail ? req.body.adminEmail : '';
    let password = req.body.password ? req.body.password : '';

    //validation request
    if (adminEmail === null || adminEmail === '') {
        return res.status(400).send({ message: 'Email is required', "status": 400 })
    } else {
        if (password === null || password === '') {
            return res.status(400).send({ message: 'Password is required', "status": 400 })
        }
    }

    //check, get and verify login data from database
    admin.findOne({ "adminEmail": adminEmail.toLowerCase() })
        .then(data => {
            if (data == null || data == '') {
                return res.status(404).send({
                    message: 'email does not exist',
                    "status": 404
                });
            }

            else {

                let passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
                if (!passwordIsValid) {
                    return res.status(401).send({
                        message: "Invalid Password!",
                        "status": 401
                    });
                } else {
                    let token = generateToken(data._id);
                  
                        
                    return res.status(200).send({ accessToken: token,
                        data: data,
                        message: "Success",
                        "status": 200})

                }
            }



        })
        .catch(err => {
            res.status(400).send({
                message: err.message,
                "status": 400
            });
        });
}

exports.getAllUser = async(req,res) => {
    try {
        let data = await user.find({})
        if(data.length === 0){
            return res.status(404).send({data:data,message:"No data fount",status: 404});
        }else{
        return res.status(200).send({data:data,message:"Success",status: 200});
        }
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })

    }
}


exports.getCountOfData = async(req,res)=>{

    try {
        
        let userData = await user.find({})
        let jobData = await jobs.find({})
         let categoryData = await category.find({})

        let userCount = userData.length;
        let jobCount = jobData.length;
        let categoryCount = categoryData.length;
        return res.status(200).send({data:{userCount, jobCount, categoryCount},message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message , status:500});

    }
}