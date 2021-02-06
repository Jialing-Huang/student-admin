const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const checkAuth = require('../middlewares/check-auth'); 

//To get all students at /student/list page
router.get('/students', (req,res)=>{
    Student
        .find()
        .exec()
        .then(docs=>{
            console.log(docs);
            console.log("get all students!");
            res.status(200).send({students:docs});  //Send an item json structure of the array
        })
        .catch(err => {
            res.status(500).json({
                error:err
            });
        });
});

//To get a student by transferred id as the _id of mongodb object at /student/detail and /student/update pages
router.get('/student/:mongoid', (req,res)=>{
    const id = req.params.mongoid;
    Student
        .findById(id)
        .exec()
        .then(docs=>{
            console.log(docs);
            res.status(200).send({detail:docs});
        })
        .catch(err => {
            res.status(500).json({
                error:err
               });
       });
   });

//To add a new student object
router.post('/add', (req,res)=>{
    const student = new Student(
        {
            FirstName:req.body.FirstName,
            LastName:req.body.LastName,
            Gender:req.body.Gender,
            BirthDate:req.body.BirthDate,
            RegisterDate:req.body.RegisterDate,
            Email:req.body.Email,
            Program:req.body.Program,
            Branch:req.body.Branch,
            PhotoPath:req.body.PhotoPath,
            DocumentPath:req.body.DocumentPath
        }
    );
    //注意这里是小写student，意即是新创建的student
    student
        .save()
        .then(docs=>{
            console.log(docs);
            res.status(200).send({student: docs});
        })
        .catch(err => {
            res.status(500).json({
                error:err
            });
        });  
});

//To update at /student/update page
router.patch('/update/:mongoid', (req,res)=>{
    const id = req.params.mongoid;   
    Student
        .findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        )      
        .then(docs => {
            console.log(docs);
            res.status(200).send({ message:'Update success!'});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
});

//To delete at /student/list page
router.delete('/delete/:mongoid', checkAuth, (req,res)=>{
    const id = req.params.mongoid;   
    Student
        .findByIdAndRemove(id)      
        .then((result) => {
            console.log(result);
            res.status(200).send({message:"Delete success!"});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
});

module.exports = router;