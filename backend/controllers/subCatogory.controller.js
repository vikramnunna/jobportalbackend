const config = require("../config/auth.config")
const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const category = require("../models/category.model")
const subCategoryategorys= require("../models/subCategory.model")



exports.addSubCategory = async (req, res) => {
    let categoryId = req.params.categoryId;
    let  subCategory = req.body.subCategory ? req.body.subCategory : '';
 
    var regName = /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/;
   
    try {
        
      
   
           if(! subCategory.match(regName)){
               return res.status(400).send({ message: 'First letter should be capital', "status": 400 });
           }
           
       
   
       //check if  category already exists
       let checksubCategory = await subCategoryategorys.find({  subCategory:  subCategory }).lean()
       if (checksubCategory.length > 0) {
           return res.status(403).send({ message: ' category already exists', "status": 403 })
       }
   
    
       let getData = await category.findOne({_id:categoryId})
   
       let data = await subCategoryategorys.create({
        categoryId:categoryId,
        subCategory: subCategory,
        categoryName:getData.category
        
        })
   
           //  category.push( category);
       return res.status(200).send({data : data, message: "success", "status": 200 });
   
    } catch (error) {
       res.status(500).send({ message: error.message, "status": 500 })
   
    }
   
   }
   
   exports.getSubCategory = async (req, res) => {
    let categoryId = req.params.categoryId;
    try {

        let userAccording = req.params.allActive;
        // console.log(userAccording);
        let userTypeSplit = userAccording.split("_");
        let getSubCategoryCondition = '';
        switch (userTypeSplit[0]) {
          case 'All':
            getSubCategoryCondition = {}; 
              break;
          case 'categoryId':
            getSubCategoryCondition = { categoryId:userTypeSplit[1]};
              break;
    
              case 'categoryName':
                getSubCategoryCondition = { categoryName:userTypeSplit[1]};
                  break;
    
          default:
            getSubCategoryCondition = { message:"Please provide valid type"};
              break;
      }
        let data = await subCategoryategorys.find(getSubCategoryCondition)
        if(data.length===0){
           return res.status(404).send({data: data, message: "No data found", "status": 404 });
   
        }
        else{
           return res.status(200).send({data: data, message: "success", "status": 200 });
          }
   
    } catch (error) {
       res.status(500).send({ message: error.message, "status": 500 })
   
    }
   }
   
   exports.updateSubCategory = async(req, res) =>{
    let id = req.params.id;
    let  subCategory = req.body.subCategory ? req.body.subCategory : '';
   
       try {
           if( subCategory === null ||  subCategory === ''){
               return res.status(400).send({ message: ' sub category  is require ', "status": 400 });
         
           }
   
   
       //check if  category already exists
   
       let getCategory=await subCategoryategorys.findOne({_id:id});
       if(getCategory.subCategory ===  subCategory){
          
       }else{
       let checkCategory = await subCategoryategorys.find({
         subCategory:  subCategory
         }).lean()
   
       if (checkCategory.length > 0) {
           return res.status(403).send({ message: ' category already exists', "status": 403 })
       }
   }
       
   
   
   let data = await subCategoryategorys.findOneAndUpdate({ _id: id},
     
       {
        subCategory: subCategory,
          
   
       }
   
   ,{new:true})
  
   if(data === null ){
       return res.status(404).send({data: data, message: "No data found", "status": 404 });
   
   }else{
       return res.status(200).send({data , message: "success", "status": 200 });
   
   }
   
   
   
   
       } catch (error) {
           res.status(500).send({ message: error.message, "status": 500 })
      
       }
   }
   
   
   exports.deleteSubCategory = async (req, res) => {
        let id = req.params.id;
       let  subCategory = req.body.subCategory ? req.body.subCategory : '';
   
       try {
       
        //   let getdata = await subCategoryategorys.findOne({_id:id})

        // let checkSubCategoryInProduct = await product.findOne({subcategory:getdata.subCategory})

        // if(checkSubCategoryInProduct){
        //     return res.status(403).send({message:"Already added this subcategory with product, can't delete",status:403})
        // }
         
          
           let data = await subCategoryategorys.findOneAndDelete({
            _id:id
           },{ new: true})
            
       
     
   
           res.status(200).json({message: "deleted sub category successfuly", "status": 200} )
       } catch (error) {
           res.status(500).send({ message: error.message, "status": 500 })
   
       }
   }
   