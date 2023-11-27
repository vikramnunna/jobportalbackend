module.exports = (app) => {

    const userSign = require('../controllers/userSignUp.controller');

    const applyJob = require("../controllers/applyJob.controller")

    // ---------------user api start from here--------------------------------

    app.post('/api/userSignUP' ,userSign.userSignUP);

    app.post('/api/UserLogin' ,userSign.UserLogin);

    app.get("/api/getUserInfo/:id",userSign.getUserInfo)

     app.put("/api/addUserInformation/:id",userSign.upload.single("upload_resume"),userSign.addUserInformation)

    app.get("/api/getJobList/:allActive" , userSign.getJobList)

    app.post("/api/applyForJob/:userId/:jobId",applyJob.applyForJob)

   

    
 
}