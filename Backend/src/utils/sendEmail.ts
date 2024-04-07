import nodemailer from 'nodemailer'

const sendEmail = async (
  email: string,
  username: string,
  verificationCode: string,
  subject: string,
) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verification Email from ${process.env.APP_NAME}</title>
      <style>
      /* Reset default styles */
      body, h1, p {
        margin: 0;
        padding: 0;
      }
      
      /* Set background color and font family */
      body {
        background-color: #f4f4f4;
        font-family: Arial, sans-serif;
      }
      
      /* Container to center content */
      .container {
        width: 100%;
        max-width: 250px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
      }
      
      /* Add basic styles for better formatting */
      h1 {
        font-size: 1.5em;
        margin-bottom: 10px;
        color: #1f1f1f;
      }
      
      p {
        line-height: 1.5;
        color: #1f1f1f;
      }
      
      /* Style the verification code */
      .verification-code {
        margin-top: 10px;
        display: inline-block;
        padding: 10px 20px;
        background-color: #1f1f1f;
        color: #ffffff;
        letter-spacing: 3px;
        font-size: 1.5em;
        font-weight: bold;
        border-radius: 5px;
      }
      
      /* Footer styles */
      .footer {
        margin-top: 20px;
        font-style: italic;
        color: #888888;
      }
      </style>
      </head>
      <body>
      <div class="container">
        <h1>Hi ${username},</h1>
        <p>Please use this code to ${subject}:</p>
        <p class="verification-code">${verificationCode}</p>
        <br />
        <p>If you did not make this request, please ignore this message.</p>
        <p class="footer">Sincerely, <br>${process.env.APP_NAME}</p>
      </div>
      </body>
      </html>
    `,
    }
    // Send the email
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve(true)
      }
    })
  })
}

export { sendEmail }
