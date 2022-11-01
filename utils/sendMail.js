import nodemailer from 'nodemailer';

const sendMail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      port: 587,
      secure: true,
      auth: {
        user: 'ragulclasses@gmail.com',
        pass: 'blxdspjmawayszvx',
      },
    });

    await transporter.sendMail({
      from: 'ragulclasses@gmail.com',
      to: email,
      subject: subject,
      text: text,
    });
    console.log('email sent sucessfully');
  } catch (error) {
    console.log(error, 'email not sent');
  }
};

export default sendMail;
