import {transporter} from '../config/emailConfig'

export async function sendVerificationEmail(
    email:string, 
    verificationLink:string
) {
    await transporter.sendMail({
        from:process.env.mail_user,
        to:email,
        subject:'Verify your email',
        html: `
      <h2>Welcome to User Management System</h2>

      <p>Please verify your email.</p>

      <a href="${verificationLink}">
        Verify Email
      </a>
    `,
    })
}