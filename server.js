const express = require('express');
const cors = require('cors');
const uri = "mongodb+srv://mainuser:mongodbenter@chatdb.e3hwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const monk = require('monk');
const nodemailer = require('nodemailer')
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("express"));

const db = monk(uri || 'localhost/messager')

const messages = db.get('messages');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'contact.bulcher@gmail.com',
    pass: 'contactemail'
  }

})


app.get('/lolpage.html', function(req,res) {
  const API_KEY = "RGAPI-ef9397bf-99b9-4847-b2c4-37bcb707c489"
  const url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Doublelift?api_key="

  fetch(url + API_KEY)
    .then(res => res.json())
    .then(data => {
            console.log(data);
           
        })
})




app.post('/', function(req,res){
const mailOptions = {
  from: req.body.email,
  to: 'contact.bulcher@gmail.com',
  subject: req.body.subject,
  text: `Message From ${req.body.person}:\n${req.body.email}\n\n${req.body.message}`
}
if(mailOptions.from !=='' && mailOptions.from !== 'undefined' && mailOptions.from){
transporter.sendMail(mailOptions, (error, info)=> {
  if(error){
    console.log(error);
    res.send(error);
  }else {
    console.log('Email sent: ' + info.response);
    res.send('success');
  }
})
}
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

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});