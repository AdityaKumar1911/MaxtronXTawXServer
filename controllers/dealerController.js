// controllers/dealerController.js

const nodemailer = require("nodemailer");

// Create a transporter using the Gmail service
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_PASS, // Your Gmail password or app-specific password
  },
});

// Controller for handling dealership form submission
exports.submitDealerApplication = async (req, res) => {
  const { name, email, phone, businessName, location } = req.body;

  // Validate the data (basic validation)
  if (!name || !email || !phone || !businessName || !location) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Prepare the email content for the admin
  const adminMailOptions = {
    from: process.env.GMAIL_USER,
    to: "maxtroninquiry@gmail.com", // Admin's email
    cc: [
      "shree@dynahitech.com",
      "mayank@dynahitech.com",
      "Amitksaroha@dynahitech.com",
      "maxtroninquiry@dynahitech.com",
    ],
    subject: "New Dealership Application",
    text: `A new dealership application has been submitted.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nBusiness Name: ${businessName}\nLocation: ${location}`,
    html: `
      <h2>New Dealership Application</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Business Name:</strong> ${businessName}</p>
      <p><strong>Location:</strong> ${location}</p>
    `,
  };

  // Send the email to the admin
  try {
    await transporter.sendMail(adminMailOptions);
  } catch (error) {
    console.error("Error sending email to admin:", error);
    return res.status(500).json({ error: "Error sending email to admin." });
  }

  // Prepare the confirmation email for the user
  const userMailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Thank You for Your Dealership Application",
    html: `
      <h2>Thank You for Applying to Become a Maxtron Dealer</h2>
      <p>Dear ${name},</p>
      <p>Thank you for your interest in becoming a Maxtron dealer! We have received your application and will review it shortly. Our team will contact you soon with more information.</p>
      <p>Your Application Details:</p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Business Name:</strong> ${businessName}</li>
        <li><strong>Location:</strong> ${location}</li>
      </ul>
      <p>Best Regards,</p>
      <p>MaxtronEV Team</p>
    `,
  };

  // Send the confirmation email to the user
  try {
    await transporter.sendMail(userMailOptions);
  } catch (error) {
    console.error("Error sending confirmation email to user:", error);
    return res.status(500).json({ error: "Error sending confirmation email." });
  }

  return res.status(200).json({
    message: "Your dealership application has been submitted successfully!",
  });
};
