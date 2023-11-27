const config = require("../config/auth.config")
const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const categorys= require("../models/category.model")

const job = require("../models/job.model")



exports.addCategory = async (req, res) => {
    let  category = req.body.category ? req.body.category : '';
 
    var regName = /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/;
   
    try {
        
      
   
           if(! category.match(regName)){
               return res.status(400).send({ message: 'First letter should be capital', "status": 400 });
           }
           
       
   
       //check if  category already exists
       let checkcategory = await categorys.find({  category:  category }).lean()
       if (checkcategory.length > 0) {
           return res.status(403).send({ message: ' category already exists', "status": 403 })
       }
   
    
   
       let data = await categorys.create({
            category: category,
        
        })

   
           //  category.push( category);
       return res.status(200).send({data : data, message: "success", "status": 200 });
   
    } catch (error) {
       res.status(500).send({ message: error.message, "status": 500 })
   
    }
   
   }
   
   exports.getCategory = async (req, res) => {
    let category = req.params.category;
    try {


        let userAccording = req.params.allActive;
        console.log(userAccording);
        let userTypeSplit = userAccording.split("_");
        let getCategoryCondition = '';
        switch (userTypeSplit[0]) {
          case 'All':
            getCategoryCondition = {}; 
              break;
          case 'id':
            getCategoryCondition = { _id:userTypeSplit[1]};
              break;
      
          default:
            getCategoryCondition = { message:"Please provide valid type"};
              break;
        }
        let data = await categorys.find(getCategoryCondition)

        
      

      
        if(data.length===0){
           return res.status(404).send({data: data, message: "No data found", "status": 404 });
   
        }
        else{
            // for(var i=0; i<data.length; i++){
            //     var subCategoryData = await subCategorys.find({category : data[i].caregory})

            //     getData.push(subCategoryData)

            // }
           return res.status(200).send({data: data, message: "success", "status": 200 });
          }
   
    } catch (error) {
       res.status(500).send({ message: error.message, "status": 500 })
   
    }
   }
   
   exports.updateCategory = async(req, res) =>{
       let id= req.params.id;
       let  category = req.body.category ? req.body.category : '';
   
       try {
           if( category === null ||  category === ''){
               return res.status(400).send({ message: ' category is require ', "status": 400 });
         
           }
   
   
       //check if  category already exists
   
       let getCategory=await categorys.findOne({_id:id});
       if(getCategory. category ===  category){
          
       }else{
       let checkCategory = await categorys.find({ category:  category }).lean()
   
       if (checkCategory.length > 0) {
           return res.status(403).send({ message: ' category already exists', "status": 403 })
       }
   }
       
   
   
   let data = await categorys.findOneAndUpdate({ _id: id},
     
       {
           category: category,
          
   
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
   
   
   exports.deleteCategory = async (req, res) => {
        let id = req.params.id;
       let  category = req.body. category ? req.body. category : '';
   
       try {
       


            //    let getdata = await categorys.findOne({_id:id})


        // let checkCategoryInProduct = await product.findOne({category:getdata.category})

        // if(checkCategoryInProduct){
        //     return res.status(403).send({message:"Already added this category with products, can't delete",status:403})
        // }

        // let checkCategoryInSubC = await subCategorys.findOne({categoryId:id})
        // if(checkCategoryInSubC){
        //     return res.status(403).send({message:"Already added this category with sub category, can't delete",status:403})
        // }


           let data = await categorys.findOneAndDelete({
            _id:id
           },{ new: true})
            
       
     
   
           res.status(200).json({message: "deleted  category successfully", "status": 200} )
       } catch (error) {
           res.status(500).send({ message: error.message, "status": 500 })
   
       }
   }
   
   exports.getCountOfCategory = async(req,res) =>{

    let getData = await categorys.find({},{
        _id:0,
        __v:0
    })

    console.log(getData)
   

    let data = await job.find({})
    const counts = {};

// Iterate through the data and count the occurrences of each key
data.forEach(item => {
    const { category } = item;
    if (counts[category]) {
        counts[category]++;
    } else {
        counts[category] = 1;
    }
});

// Output the counts
console.log(counts);


return res.status(200).send({data: counts});



   }