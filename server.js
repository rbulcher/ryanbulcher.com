const express = require('express');
const path = require('path');
const { env } = require('process');
const { cursorTo } = require('readline');
const app = express();
app.use(express.json());
app.use(express.static("express"));
app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/express/index.html'));
    //__dirname : It will resolve to your project folder.
  });
const port = 3000;
app.listen(port || process.env.PORT);
console.debug('Server listening on port ' + port);