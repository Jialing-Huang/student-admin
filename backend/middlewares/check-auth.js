//This file co-operates with auth-interceptor.ts to run auth check.
// The file is imported into card-route.js as checkAuth to control auth check at backend
//The file is a (req,res,next) server loop as try...catch structure and do:
//   1.  Get the secret code in the jsonwebtoken
//   2.  Use jwt.verify() to compare the secret code with stored string

const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "secret_this_should_be_longer");
        next();
    }
    catch(error){
        res.status(401).send({message:"Auth failed due to incorrect jwt validation!"});
    }
};