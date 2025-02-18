const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5174",
  })
);

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "maxtroninquiry@gmail.com",
    pass: "kwaq wjzk rzfc avoy",
  },
});

// Email sending endpoint
app.post("/send-email", (req, res) => {
  const { name, email, phone, message } = req.body;

  // Admin email content
  const adminMailOptions = {
    from: "maxtroninquiry@gmail.com",
    to: "maxtroninquiry@gmail.com", // Admin email
    cc: [
      "shree@dynahitech.com",
      "mayank@dynahitech.com",
      "Amitksaroha@dynahitech.com",
      "maxtroninquiry@dynahitech.com",
    ], // CC recipients
    subject: "New Contact Form Submission from MaxtronEV",
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333333; background-color: #f4f4f4; padding: 20px;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #2c3e50; text-align: center; font-size: 24px; margin-bottom: 20px;">New Contact Form Submission</h2>
            <p style="font-size: 16px; color: #555555;">You have received a new form submission from MaxtronEV. Here are the details:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; width: 30%;">Name:</td>
                <td style="padding: 10px;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold;">Email:</td>
                <td style="padding: 10px;">${email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold;">Phone:</td>
                <td style="padding: 10px;">${phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold;">Message:</td>
                <td style="padding: 10px;">${message}</td>
              </tr>
            </table>
            <p style="font-size: 14px; color: #888888; margin-top: 20px;">This message was sent from the contact form on MaxtronEV. Please follow up as necessary.</p>
          </div>
        </body>
      </html>
    `,
  };

  // User confirmation email content
  const userMailOptions = {
    from: "maxtroninquiry@gmail.com",
    to: email,
    subject: "Thank you for contacting MaxtronEV",

    html: `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333333; background-color: #f4f4f4; padding: 20px;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #2c3e50; text-align: center; font-size: 24px; margin-bottom: 20px;">Thank You for Contacting MaxtronEV!</h2>
            <p style="font-size: 16px; color: #555555;">Dear ${name},</p>
            <p style="font-size: 16px; color: #555555;">Thank you for your interest in MaxtronEV! We’ve received your message, and our team will get back to you as soon as possible.</p>
            
            <p style="font-size: 16px; color: #555555;">Here is a copy of your message:</p>
            <blockquote style="background-color: #f9f9f9; padding: 15px; border-left: 5px solid #2ecc71; font-style: italic; color: #555555;">
              "${message}"
            </blockquote>
            
            <p style="font-size: 16px; color: #555555;">You also provided the following contact details:</p>
            <ul style="font-size: 16px; color: #555555;">
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${phone}</li>
            </ul>

            <p style="font-size: 16px; color: #555555;">We appreciate your time, and we look forward to connecting with you soon!</p>
            <p style="font-size: 16px; color: #555555; font-weight: bold;">MaxtronEV Team</p>
          </div>
          <footer style="margin-top: 30px; text-align: center; font-size: 14px; color: #888888;">
            <p style="margin: 0;">If you did not submit this form, please disregard this email.</p>
          </footer>
        </body>
      </html>
    `,
  };

  // Send email to the admin
  transporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
      console.log("Error sending to admin:", error);
      return res.status(500).json({ error: "Error sending email to admin" });
    }

    // If admin email is sent successfully, send email to the user
    transporter.sendMail(userMailOptions, (error, info) => {
      if (error) {
        console.log("Error sending to user:", error);
        return res
          .status(500)
          .json({ error: "Error sending confirmation email to user" });
      }

      // If both emails are sent successfully
      res
        .status(200)
        .json({ message: "Emails sent successfully to both admin and user" });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// shree@dynahitech.com
// mayank@dynahitech.com
// Amitksaroha@dynahitech.com
// maxtroninquiry@dynahitech.com
