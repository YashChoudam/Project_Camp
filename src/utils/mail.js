import Mailgen from "mailgen";
import nodemailer from "nodemailer";


// main function where mail is created and sent 
const sendEmail = async (options) => {

  // creates mail instance
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Project Camp",
      link: "https://taskmanagerlink.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  // establishes connection with mailtrap 
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  // Actual mail  
  const mail = {
    from: "yashchoudam2005@gmail.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  // mail is sent here
  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error("Error sending the email , make sure that you provided the correct email ", error);
  }
};

// This function generates the content of the email --> used for verification of the user
const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to project Camp , we are excited to have you on board",
      action: {
        instructions: "To verify your email please click on the button below ",
        button: {
          color: "#1aae5aff",
          text: "Verify Your email",
          link: verificationUrl,
        },
      },
      outro: "Need help , just reply on this email",
    },
  };
};

// Content of the mail generator - which is used for generating the content of reset password
const forogotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a password reset request from your side ",
      action: {
        instructions:
          "To reset  your password , please click on the button below ",
        button: {
          color: "#dd1947ff",
          text: "Reset your password",
          link: passwordResetUrl,
        },
      },
      outro: "Need help , just reply on this email",
    },
  };
};

export { emailVerificationMailgenContent, forogotPasswordMailgenContent , sendEmail};
