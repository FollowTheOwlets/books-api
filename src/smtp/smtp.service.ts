import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.mail.ru',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
});

export const sendMail = async (email: string, token: string) => {
  const confirmationUrl = `${process.env.BASE_URL}/users/confirm/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Пожалуйста, подтвердите свою почту',
    text: `Перейдите по ссылке для того чтобы подтвердить электронную почту: ${confirmationUrl}`,
  });
};
