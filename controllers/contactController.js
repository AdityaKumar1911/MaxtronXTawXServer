const nodemailer = require('nodemailer');

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or use SendGrid or other services
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendContactEmail = (req, res) => {
  const { name, email, phone, message } = req.body;

  // Compose email
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email
    to: 'your-receiver-email@example.com', // Recipient's email
    subject: `Contact Form Submission from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
    console.log('Email sent: ' + info.response);
    return res.status(200).json({ message: 'Email sent successfully' });
  });
};

module.exports = { sendContactEmail };
