// utils/sendEmail.ts

import nodemailer from "nodemailer";

export const sendEmail = async ({
  receiver,
  subject,
  body,
}: {
  receiver: string;
  subject: string;
  body: string;
}): Promise<{ isSuccess: boolean }> => {
  try {
    // Create a transporter using SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: `ZenMart <${process.env.GMAIL_ACCOUNT}>`,
      to: receiver,
      subject: subject,
      html: body,
    };

    await transporter.sendMail(mailOptions);

    return { isSuccess: true };
  } catch (error) {
    return { isSuccess: false };
  }
};
