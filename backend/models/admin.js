const mongoose = require("mongoose");
//Import mongoose-unique-validator
const uniqueValidator = require("mongoose-unique-validator");

//Create schema for user
const adminSchema = mongoose.Schema(
    { 
        Email:{type:String, required:true, unique:true},
        Password:{type:String, required:true} 
        /* Email:String,
        Password:String,  */
    }
);

//Attach unique attribute to the userSchema
adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Admin",adminSchema);