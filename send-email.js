
// Requiring in-built https for creating
// https server
const https = require("https");
  
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Enable CORS for all requests
app.use(cors());

app.get('/test', (req, res) => {
  console.log("Test Working");
})

// define endpoint for sending email
app.post('/send-email', (req, res) => {
    console.log(req.body);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jaredhfinn@gmail.com', // your Gmail username
      pass: 'cnww iost neev ichs' // your Gmail password
    }
  });

  // send mail with defined transport object
  let mailOptions = {
    from: 'jaredhfinn@gmail.com', // sender address
    to: 'jaredhfinn@gmail.com', // list of receivers
    subject: req.body.subject, // Subject line
    html: `<p><strong>Name:</strong> ${req.body.message.name}</p>
            <p><strong>Phone:</strong> ${req.body.message.phone}</p>
            <p><strong>Email:</strong> ${req.body.message.email}</p>
            <p><strong>Proposal:</strong> ${req.body.message.proposal}</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});
  

// start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
