import { sendEmail } from "@/utils/Email";

export const sendVerificationEmail = async (
  email: string,
  token: string
): Promise<{ isSuccess: boolean }> => {
  const confirmationLink = `https://www.zenmart.com/auth/new-verification?token=${token}`;
  const htmlContent = `
    <body>
        <div class="container">
            <div class="header">
                <h1>Confirm Your Email Address</h1>
            </div>
            <div class="content">
                <p>Hello, @${email.split(".")[0]}</p>
                <p>Thank you for signing up. Please confirm your email address by clicking the button below:</p>
                <a href="${confirmationLink}">Confirm Email</a>
                <p>If you did not sign up for this account, you can ignore this email.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 ZenMart. All rights reserved.</p>
            </div>
        </div>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                padding: 20px 0;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                color: #333333;
            }
            .content {
                padding: 20px;
                text-align: left;
            }
            .content p {
                font-size: 16px;
                color: #666666;
                line-height: 1.5;
            }
            .content a {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                font-size: 16px;
                color: #ffffff;
                background-color: #007bff;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 14px;
                color: #999999;
            }
        </style>
</body>
`;

  const res = await sendEmail({
    receiver: email,
    subject: "Confirm Your Email",
    body: htmlContent,
  });

  return res;
};

export const sendResetPasswordEmail = async (
  email: string,
  token: string
): Promise<{ isSuccess: boolean }> => {
  const resetPasswordLink = `https://www.zenmart.com/auth/new-password?token=${token}`;
  const htmlContent = `
    <body>
        <div class="container">
            <div class="header">
                <h1>Confirm Your Password Reset Request</h1>
            </div>
            <div class="content">
                <p>Hello, @${email.split(".")[0]}</p>
                <p>Reset Your Password By Clicking The Link Below.</p>
                <a href="${resetPasswordLink}">Confirm Password Reset</a>
                <p>If you did not request password reset, you can ignore this email.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 ZenMart. All rights reserved.</p>
            </div>
        </div>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                padding: 20px 0;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                color: #333333;
            }
            .content {
                padding: 20px;
                text-align: left;
            }
            .content p {
                font-size: 16px;
                color: #666666;
                line-height: 1.5;
            }
            .content a {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                font-size: 16px;
                color: #ffffff;
                background-color: #007bff;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 14px;
                color: #999999;
            }
        </style>
</body>
`;

  const res = await sendEmail({
    receiver: email,
    subject: "Confirm Your Change Password Request",
    body: htmlContent,
  });

  return res;
};

export const sendTwoFactorAuthenticationTokenEmail = async (
  email: string,
  token: string
): Promise<{ isSuccess: boolean }> => {
  const htmlContent = `
    <body>
        <div class="container">
            <div class="header">
                <h1>Two Factor Authentication Code</h1>
            </div>
            <div class="content">
                <p>Hello, @${email.split(".")[0]}</p>
                <p>Enter The Code Below In The Two Factor Authentication Code Input!</p>
                <h1 class="code-heading">${token}</h1>
                <p>If you did not request password reset, you can ignore this email.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 ZenMart. All rights reserved.</p>
            </div>
        </div>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .code-heading {
                font-size: 4rem;
                font-weight: bold;
            }
            .header {
                text-align: center;
                padding: 20px 0;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                color: #333333;
            }
            .content {
                padding: 20px;
                text-align: left;
            }
            .content p {
                font-size: 16px;
                color: #666666;
                line-height: 1.5;
            }
            .content a {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                font-size: 16px;
                color: #ffffff;
                background-color: #007bff;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 14px;
                color: #999999;
            }
        </style>
</body>
`;

  const res = await sendEmail({
    receiver: email,
    subject: "Two Factor Authentication Code",
    body: htmlContent,
  });
  return res;
};

export const sendContactEmail = async (
  name: string,
  email: string,
  message: string
): Promise<{ isSuccess: boolean }> => {
  const htmlContent = `
    <body>
        <div class="container">
            <div class="header">
                <h1>Two Factor Authentication Code</h1>
            </div>
            <div class="content">
                <p>From, ${`name <${email}>`}</p>
                <p>${message}</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 ZenMart. All rights reserved.</p>
            </div>
        </div>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .code-heading {
                font-size: 4rem;
                font-weight: bold;
            }
            .header {
                text-align: center;
                padding: 20px 0;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                color: #333333;
            }
            .content {
                padding: 20px;
                text-align: left;
            }
            .content p {
                font-size: 16px;
                color: #666666;
                line-height: 1.5;
            }
            .content a {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                font-size: 16px;
                color: #ffffff;
                background-color: #007bff;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 14px;
                color: #999999;
            }
        </style>
</body>
`;

  const res = await sendEmail({
    receiver: "roocking.prince@gmail.com",
    subject: "Contact Email From Customers",
    body: htmlContent,
  });
  return res;
};
