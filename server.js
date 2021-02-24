const express = require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://mainuser:mongodbenter@chatdb.e3hwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const monk = require('monk');
const nodemailer = require('nodemailer')
const path = require('path');
const { env, getMaxListeners } = require('process');
const { cursorTo } = require('readline');
const app = express();

const db = monk(uri || 'localhost/messager')

const messages = db.get('messages');

app.use(cors());
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
  text: `Message From ${req.body.person}:\n${req.body.email}\n\n${req.body.message}`
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

app.use('/chatroom.html', (req,res) => {
  res.json({
    mesage: 'Message update?!'
  })
});

app.get('/messages', (req,res)=> {
  messages 
    .find()
    .then(messages => {
      res.json(messages);
    })
})


function isValidMessage(message) {
  return message.name && message.name.toString().trim() !== '' && message.name.toString().trim().length <= 50 &&
  message.content && message.content.toString().trim() !== '' && message.content.toString().trim().length <= 140;
}


app.post('/messages', (req,res)=> {
  if(isValidMessage(req.body)) {
    // insert into DB
    const message = {
      name: req.body.name.toString(),
      content: req.body.content.toString(),
      created: new Date()
    }
    messages
    .insert(message)
    .then(createdMessage=>{
      res.json(createdMessage);
    });
  } else {
    res.status(422);
    res.json( {
      message: 'Hey! Name and content are required!'
    })
  }
})

app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/express/index.html'));
    //__dirname : It will resolve to your project folder.
  });
const port = 3000;
app.listen(process.env.PORT || port);