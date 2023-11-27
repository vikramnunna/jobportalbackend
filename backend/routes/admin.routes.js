module.exports = (app) => {

    const admin =require("../controllers/admin.controller");

    const category = require("../controllers/category.controller")

    const subCategory = require("../controllers/subCatogory.controller")

    const job = require("../controllers/job.controller")

    const notification = require("../controllers/notification.contrller")
    
    // --------------------api start from here--------------------------------
    
    app.post("/api/adminSignUp" ,admin.adminSignUp );

    app.post("/api/adminLogin",admin.adminLogin)
    
   app.get("/api/getAllUser",admin.getAllUser)

   
   app.post("/api/addCategory",category.addCategory)

   app.get("/api/getCategory/:allActive",category.getCategory)

   app.put("/api/updateCategory/:id",category.updateCategory)

   app.delete("/api/deleteCategory/:id",category.deleteCategory)

   app.post("/api/addSubCategory/:categoryId",subCategory.addSubCategory)

   app.get("/api/getSubCategory/:allActive",subCategory.getSubCategory)

   app.put("/api/updateSubCategory/:id",subCategory.updateSubCategory)

   app.delete("/api/deleteSubCategory/:id",subCategory.deleteSubCategory)

   app.post("/api/addJobs",job.addJobs)

   app.get("/api/getJobs/:id",job.getJobs)

   app.put("/api/updateJobDetails/:id",job.updateJobDetails)

   app.delete("/api/deleteJob/:id",job.deleteJob)



   app.post("/api/sendNotification",notification.sendPushNotification)


   app.get("/api/getCountOfCategory",category.getCountOfCategory)

   app.get("/api/getCountOfData",admin.getCountOfData)


}