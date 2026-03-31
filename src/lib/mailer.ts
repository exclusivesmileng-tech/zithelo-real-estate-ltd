import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendTeamEmail(subject: string, html: string) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.TEAM_EMAIL,
    subject,
    html,
  });
}

/** Minimal HTML email wrapper matching Zithelo branding */
export function emailTemplate(title: string, rows: [string, string | undefined][]) {
  const rowsHtml = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:8px 12px;color:#888;font-size:13px;white-space:nowrap;font-family:sans-serif;">${k}</td>
        <td style="padding:8px 12px;color:#1a1a1a;font-size:13px;font-family:sans-serif;">${v}</td>
      </tr>`
    )
    .join("");

  return `
  <!DOCTYPE html>
  <html>
  <body style="margin:0;padding:0;background:#f5f5f5;font-family:sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#c9a84c,#e8c97a);padding:24px 32px;">
              <p style="margin:0;color:#1a1a1a;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;">ZITHELO REAL ESTATE</p>
              <h2 style="margin:8px 0 0;color:#1a1a1a;font-size:20px;">${title}</h2>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${rowsHtml}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px;background:#fafafa;border-top:1px solid #eee;">
              <p style="margin:0;font-size:11px;color:#aaa;">Sent from the Zithelo website — reply directly to the sender's email above.</p>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
  </html>`;
}
