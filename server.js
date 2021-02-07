/* const http = require('http');
const app = require('./backend/app');
const port = process.env.PORT || 3000;  //Create a local server port as 3000

app.set('port',port);
const server = http.createServer(app);

server.listen(port); */
const express = require('express');
const http = require('http');
const app = require('./backend/app');
const port = process.env.PORT || 8080;  //Create a local server port as 3000

app.use(express.static('/student-admin/dist/'));

/* app.get('/*',function(req,res){
    res.sendFile('index.html',{root:'dist/student-admin/'});
}); */

app.set('port',port);
const server = http.createServer(app);

server.listen(port);