const express = require('express');
const nodemailer = require('nodemailer')
const path = require('path');
const { env, getMaxListeners } = require('process');
const { cursorTo } = require('readline');
const app = express();
app.use(express.json());
app.use(express.static("express"));

app.post('/', function(req,res){

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rjbulcher@gmail.com',
    pass: 'Bulcher00'
  }

})

const mailOptions = {
  from: req.body.email,
  to: 'rjbulcher@gmail.com',
  subject: req.body.subject,
  text: `Message From ${req.body.person}:\n\n${req.body.message}`
}
transporter.sendMail(mailOptions, (error, info)=> {
  if(error){
    console.log(error);
    res.send(error);
  }else {
    console.log('Email sent: ' + info.response);
    res.send('success');
  }
})

});


app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/express/index.html'));
    //__dirname : It will resolve to your project folder.
  });
const port = 3000;
app.listen(process.env.PORT || port);