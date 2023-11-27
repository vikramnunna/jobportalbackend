const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config")
const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const userSignup = require("../models/userSignUp.model")
const job = require("../models/job.model")
const applyJob = require("../models/applyJob.model")

function generateToken(userid) {
    return jwt.sign({ id: userid }, config.secret, { expiresIn: 15552000 });
}

exports.userSignUP = async (req, res) => {
    let name = req.body.name ? req.body.name : '';
    let userEmail = req.body.userEmail ? req.body.userEmail : '';
    let password = req.body.password ? req.body.password : '';
    let phone_number = req.body.phone_number ? req.body.phone_number : '';
    let confirmPassword = req.body.confirmPassword ? req.body.confirmPassword : '';
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;
    try {
        if (name === null || name === '') {
            res.status(400).send({ message: "Full name is required", "status": 400 });
        } else {
            if (userEmail === null || userEmail === '') {
                res.status(400).send({ message: "Email is required", "status": 400 });

            } else {
                if (!userEmail.match(mailformat)) {
                    res.status(400).send({ message: "Please provide a valid email address", "status": 400 });

                } else {
                    if (password === null || password === '') {
                        res.status(400).send({ message: "password is required", "status": 400 });

                    } else {
                        if (password.length < 8) {
                            return res.status(400).send({ message: 'Password must be atleast 8 characters long', "status": 400 })
                        } else {
                            if (!password.match(passformat)) {
                                return res.status(400).send({ message: 'Password should contain atleast one number, one capital latter,one small letter and one special character', "status": 400 })
                            } else {
                                if (confirmPassword === null || confirmPassword === '') {
                                    return res.status(400).send({ message: 'Confirm password is require ', "status": 400 })

                                } else {
                                    if (password !== confirmPassword) {
                                        return res.status(400).send({ message: 'password & confirm password is not match ', "status": 400 })

                                    } else {
                                            if (phone_number === null || phone_number === "") {
                                                return res
                                                    .status(400)
                                                    .send({
                                                        message: "Mobile Number is required",
                                                        status: 400,
                                                    });
                                            } else {
                                                if (phone_number.length < 7) {
                                                    return res
                                                        .status(400)
                                                        .send({
                                                            message:
                                                                "Mobile number cannot be less than 7 digits. ",
                                                            status: 400,
                                                        });
                                                } else {
                                                    if (phone_number.length > 15) {
                                                        return res
                                                            .status(400)
                                                            .send({
                                                                message:
                                                                    "Mobile numbers cannot be more than 15 digits long.",
                                                                status: 400,
                                                            });
                                                    } else {
                                                        if (isNaN(phone_number)) {
                                                            return res
                                                                .status(400)
                                                                .send({
                                                                    message:
                                                                        "Mobile number must only contains digits",
                                                                    status: 400,
                                                                });
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }


                }
            }
        


        let checkuserEmail = await userSignup.find({ userEmail: userEmail }).lean()
        if (checkuserEmail.length > 0) {
            return res.status(409).send({ message: 'User email already exists', "status": 409 })
        }

        let checkuserMoileNo = await userSignup.find({ phone_number: phone_number }).lean()
        if (checkuserMoileNo.length > 0) {
            return res.status(409).send({ message: 'Phone number already exists', "status": 409 })
        }

        let data = await userSignup.create({
            name: name,
            userEmail: userEmail.toLowerCase(),
            phone_number:phone_number,
            password: bcrypt.hashSync(password, 8)

        })
        return res.status(200).send({ data: data, message: "Congratulations! Your account has been created successfully!", "status": 200 })
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })
    }
}


exports.UserLogin = async (req, res) => {
    let emailOrMobile = (req.body.emailOrMobile) ? (req.body.emailOrMobile): '';
    let password = req.body.password ? req.body.password : '';





    //validation request
    if (emailOrMobile === null || emailOrMobile === '') {
        return res.status(400).send({ message: 'You need to fill your email or mobile no for login', "status": 400 })
    } else {
        if (password === null || password === '') {
            return res.status(400).send({ message: 'Password is required', "status": 400 })
        }
    }

   userSignup.findOne({
        $or: [{ userEmail: emailOrMobile.toLowerCase() }, { phone_number: emailOrMobile }],
      })
       .then(data => {
         if (data == null || data == '') {
             return res.status(404).send({
                 message: 'This user does not exist',
                 "status": 404
             });
         }

            else {
                // if (data.userEmail_verification === false) {
                //     return res.status(422).send({ message: 'Your userEmail is not verified yet.Kindly verify your userEmail before Login.', "status": 422 })
                // } else {
                let passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
                if (!passwordIsValid) {
                    return res.status(401).send({
                        message: "Invalid Password!",
                        "status": 401
                    });
                } else {
                    let token = generateToken(data._id);
                    return res.status(200).send({
                        accessToken: token,
                        data: data,
                        message: "Success",
                        "status": 200
                    });
                }
            }

            // }

        })
        .catch(err => {
            res.status(400).send({
                message: err.message,
                "status": 400
            });
        });
}

exports.getUserInfo = async(req,res) => {
    let id = req.params.id;
    try {
        let data = await userSignup.findOne({_id:id})
  
        return res.status(200).send({data: data, message: "success", "status": 200 });
          
}
catch (error) {
    return res.status(500).send({ message: error.message, "status": 500 })

}
}

const multer = require("multer");
// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the folder where files will be uploaded
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Set the file name
    },
  });
  
  exports.upload = multer({ storage });


exports.addUserInformation = async(req,res) => {
    let id = req.params.id;
    let name = req.body.name ? req.body.name : '';
    let userEmail = req.body.userEmail ? req.body.userEmail : '';
    let phone_number = req.body.phone_number ? req.body.phone_number : '';
    let gender = req.body.gender ? req.body.gender:'';
    let marital_status = req.body.marital_status ? req.body.marital_status:'';
    let hobbies = req.body.hobbies ? req.body.hobbies:'';

    try {

        if (!gender || !marital_status || !hobbies) {
            return res
              .status(400)
              .json({ message: "All fields are required" });
          }
          let path  = req.file.path;
      
        let data = await userSignup.findOneAndUpdate({_id : id},{
            $set:{
                name:name,
                userEmail:userEmail,
                phone_number:phone_number,
                gender:gender,
                marital_status:marital_status,
                hobbies:hobbies,
                upload_resume:path

            }
        },{new:true})

        return res.status(200).send({data:data,message:"Success",status:"200"});
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })

    }
}

exports.getJobList = async(req,res) =>{
    try {
        
        let userAccording = req.params.allActive;
        console.log(userAccording);
        let userTypeSplit = userAccording.split("_");
        let getJobCondition = '';
        switch (userTypeSplit[0]) {
          case 'All':
            getJobCondition = {}; 
              break;
          case 'Category':
            getJobCondition = { category:userTypeSplit[1]};
              break;

              case 'subCategory':
                getJobCondition = { subCategory:userTypeSplit[1]};
                  break;
      
          default:
            getJobCondition = { message:"Please provide valid type"};
              break;
        }
        let data = await job.find(getJobCondition)

        return res.status(200).send({data: data , message:"Success",status:200})
      
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })

    }
}


