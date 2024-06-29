import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (user, newPassword) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Password Reset",
    text: `Dear User,

    Your request to change the password has been received. 
    This is your new password:  
    ${newPassword}

    If you did not initiate this request, please disregard this email.

    Regards,
    [Coders] Team`,
  };
  try {
    const response = await transporter.sendMail(mailOptions);
    return "Email Sent Successfully";
  } catch (err) {
    console.log(err);
  }
};
