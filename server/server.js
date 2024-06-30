// server.js

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors')


const app = express();
const PORT = process.env.PORT ||3001;
const router = express.Router()

// Middleware
app.use(cors())
app.use(router)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST endpoint to handle form submission
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Email sending logic using Nodemailer
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vkjvishal321@gmail.com',
      pass: 'vynj ekbj axyv usvl',
    },
  });

  let mailOptions = {
    from: 'vkjvishal321@gmail.com',
    to: '21bd1a057wcsed@gmail.com',
    subject: 'New message from your website contact form',
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).send('Email sent');
  } catch (error) {
    console.error('Error sending email', error);
    res.status(500).send('Error sending email');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
