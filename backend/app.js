const express = require('express');
const app = express();

const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const adminRoute = require('./routes/admin-route');
const studentRoute = require('./routes/student-route');

//Set up mongoDB connection
mongoose
  .connect(
    'mongodb+srv://merlin:merlin123@merlin.v2smb.mongodb.net/card?retryWrites=true&w=majority'
  )
  .then(() =>
    console.log("Connected to database!")
  )
  .catch(() => {
    console.log("Connection failed!");
  });

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended:false}));
  app.use(bodyParser.json());
  
  //Set CORS
  app.use((req,res,next)=>{
      res.setHeader("Access-Control-Allow-Origin","*");
      res.setHeader(
              "Access-Control-Allow-Headers",
              "Origin, X-Requested-with, Content-Type, Accept, Authorization"  //注意""Authorization"别漏掉了
          );
      res.setHeader(
              "Access-Control-Allow-Methods",
              "GET,POST,PATCH,DELETE,OPTIONS"
          );
      next();
  }); 

  //本文件就是总，下面两个.use()就是约定了路由的分支
  app.use("/admin",adminRoute);
  app.use("/student",studentRoute);
  app.use(express.static(__dirname + "/dist/"));


module.exports = app;