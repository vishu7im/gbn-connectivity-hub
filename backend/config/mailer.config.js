
const nodemailer = require('nodemailer');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_MAIL || 'gbn.alumni.nilokheri@gmail.com',
    pass: process.env.MAIL_PWD || 'llvlgolxbamgkwcv'
  }
});

// Send verification email to alumni
const sendVerificationEmail = async (recipient, name, status, remarks = '') => {
  try {
    const subject = status === 'approved' 
      ? 'Your GBN Alumni Profile has been Approved' 
      : 'GBN Alumni Profile Verification Update';
    
    const htmlContent = status === 'approved'
      ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #0a2463; text-align: center;">Welcome to GBN Alumni Association!</h2>
          <p>Dear ${name},</p>
          <p>We are pleased to inform you that your alumni profile has been <strong style="color: #2d6a4f;">approved</strong>.</p>
          <p>You now have full access to all the features of our alumni portal including:</p>
          <ul>
            <li>Posting jobs</li>
            <li>Sharing posts and updates</li>
            <li>Commenting on other alumni posts</li>
            <li>Connecting with fellow alumni</li>
          </ul>
          <p>Thank you for joining our community. We look forward to your active participation!</p>
          <div style="margin-top: 30px; text-align: center; padding: 10px; background-color: #f1f1f1; border-radius: 5px;">
            <p style="margin: 0; font-size: 12px;">GBN Govt. Polytechnic Nilokheri</p>
            <p style="margin: 0; font-size: 12px;">Phone: +91-1745-246002 | Email: gbn.alumni.nilokheri@gmail.com</p>
          </div>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #0a2463; text-align: center;">GBN Alumni Profile Update</h2>
          <p>Dear ${name},</p>
          <p>We regret to inform you that your alumni profile verification is currently <strong style="color: #d62828;">on hold</strong>.</p>
          <p><strong>Remarks from the admin:</strong></p>
          <p style="background-color: #f8f8f8; padding: 10px; border-left: 4px solid #d62828;">${remarks || 'Please update your profile with accurate information and submit for verification again.'}</p>
          <p>If you have any questions or need assistance, please contact us at gbn.alumni.nilokheri@gmail.com.</p>
          <div style="margin-top: 30px; text-align: center; padding: 10px; background-color: #f1f1f1; border-radius: 5px;">
            <p style="margin: 0; font-size: 12px;">GBN Govt. Polytechnic Nilokheri</p>
            <p style="margin: 0; font-size: 12px;">Phone: +91-1745-246002 | Email: gbn.alumni.nilokheri@gmail.com</p>
          </div>
        </div>
      `;
    
    const mailOptions = {
      from: `"GBN Alumni Association" <${process.env.SENDER_MAIL || 'gbn.alumni.nilokheri@gmail.com'}>`,
      to: recipient,
      subject: subject,
      html: htmlContent
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = {
  sendVerificationEmail
};
