const nodemailer = require('nodemailer');

// dotenv configuration
require('dotenv').config()

// Create a transporter using your Gmail account
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.GMAIL_APP_PASS, // You might need to generate an app password
  },
});

const mailOptions = {
  from: {
    name: 'Testing-App',
    address: process.env.USER_EMAIL
  },
  to: "kasavardhan2001@gmail.com",                                              // use array of emails if there are more than one email to send
  subject: "Testing Application by Sending Emails using Nodemailer and Gmail",
  text: "Hello World!",

  // attachments: [
  //   {
  //     filename: 'test.pdf',
  //     path: path.join(__dirname, 'test.pdf'),
  //     contentType: 'application/pdf'
  //   },
  //   {
  //     filename: 'image.png',
  //     path: path.join(__dirname, 'image.png'),
  //     contentType: 'image/png'
  //   }
  // ]

}

const sendMail = async(transporter, mailOptions) => {
  try{
    await transporter.sendMail(mailOptions);
    console.log('email has been sent successfully!')
  }
  catch(err){
    console.log(err)
  }
}

// Immediately Invoked Function Expression (IIFE) to send the email
(async() => {
  await sendMail(transporter, mailOptions)
})();