const mongoose = require('mongoose');

const Student = mongoose.Schema(
    {               
        FirstName:String,
        LastName:String,
        Gender:String,
        BirthDate:String,
        RegisterDate:String,
        Email:String,
        Program:String,
        Branch:String,
        PhotoPath:String,
        DocumentPath:String      
    }
); 

module.exports = mongoose.model('CardModel', Student);

/* mongoid:string;
FirstName:string;
LastName:string;
Gender:string;
BirthDate:Date;
RegisterDate:string;
Email:string;
Program:string;
Class:string;
PhotoPath:string;
DocumentPath:string; */