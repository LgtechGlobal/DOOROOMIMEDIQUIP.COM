import nodemailer from 'nodemailer';

export const sendInquiryEmail = async ({ name, email, phone, company, type, productInterest, message }) => {
  const adminEmail = process.env.EMAIL_RECEIVER || 'dooroomimediquip@gmail.com';
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT) || 587;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
      <div style="background-color: #1a3c2c; padding: 20px 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h2 style="color: #d4af37; margin: 0; font-size: 22px; font-weight: bold; letter-spacing: 1px;">DOOROOMI MEDIQUIP</h2>
        <p style="color: #ffffff; margin: 6px 0 0; font-size: 13px;">New Therapy Consultation & Patient Inquiry</p>
      </div>

      <div style="padding: 24px 20px;">
        <p style="font-size: 14px; color: #333333; margin-top: 0; line-height: 1.5;">
          A new therapy consultation inquiry has been submitted through the official Dooroomi Mediquip portal:
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px;">
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; font-weight: bold; color: #1a3c2c; width: 35%;">Patient / Client Name:</td>
            <td style="padding: 10px 0; color: #333333;"><strong>${name}</strong></td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; font-weight: bold; color: #1a3c2c;">Contact Email:</td>
            <td style="padding: 10px 0; color: #333333;"><a href="mailto:${email}" style="color: #1a3c2c; text-decoration: underline;">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; font-weight: bold; color: #1a3c2c;">Phone Number:</td>
            <td style="padding: 10px 0; color: #333333;"><a href="tel:${phone}" style="color: #1a3c2c; text-decoration: underline;">${phone || 'Not Provided'}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; font-weight: bold; color: #1a3c2c;">Organization / Clinic:</td>
            <td style="padding: 10px 0; color: #333333;">${company || 'Private Individual'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; font-weight: bold; color: #1a3c2c;">Therapy Device / Interest:</td>
            <td style="padding: 10px 0; color: #2e7d32; font-weight: bold;">${productInterest || 'Free Therapy Consultation'}</td>
          </tr>
          <tr>
            <td style="padding: 14px 0 6px; font-weight: bold; color: #1a3c2c;" colspan="2">Health Concern & Requirement Details:</td>
          </tr>
          <tr>
            <td style="padding: 12px; background-color: #f9fbf9; border-radius: 8px; color: #444444; line-height: 1.6; border: 1px solid #e8ede8;" colspan="2">
              ${(message || 'No additional message provided.').replace(/\n/g, '<br/>')}
            </td>
          </tr>
        </table>

        <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #eeeeee; text-align: center;">
          <a href="mailto:${email}?subject=Regarding Your Dooroomi Therapy Inquiry" style="display: inline-block; background-color: #1a3c2c; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 20px; font-weight: bold; font-size: 13px;">Reply to Patient Directly</a>
        </div>
      </div>

      <div style="background-color: #f7f7f7; padding: 14px; border-radius: 0 0 8px 8px; text-align: center; font-size: 11px; color: #888888;">
        Dooroomi Mediquip · 100% Free Daily Therapy Network · South Korea & India
      </div>
    </div>
  `;

  if (!smtpUser || !smtpPass) {
    console.log(`[EMAIL NOTICE] Inquiry saved to MongoDB. Live email delivery to ${adminEmail} requires SMTP_USER and SMTP_PASS in backend/.env.`);
    return { sent: false, reason: 'SMTP credentials not configured in backend/.env' };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  const mailOptions = {
    from: `"Dooroomi Therapy Portal" <${smtpUser}>`,
    to: adminEmail,
    replyTo: email,
    subject: `🔔 New Therapy Inquiry: ${name} (${productInterest || 'Free Therapy'})`,
    html: htmlContent
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`[EMAIL SENT] Notification delivered to ${adminEmail}: ${info.messageId}`);
  return { sent: true, messageId: info.messageId };
};
