import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = "info@listwithlew.com";

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 16px;background:#f9f9f9;font-size:13px;color:#666;width:140px;white-space:nowrap;">${label}</td>
    <td style="padding:8px 16px;font-size:13px;color:#111;">${value || "<em style='color:#aaa'>not provided</em>"}</td>
  </tr>`;
}

function emailTemplate(title: string, rows: string, source: string) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e5e5e5;">
        <tr>
          <td style="background:#0d0d0d;padding:20px 24px;">
            <p style="margin:0;font-size:18px;color:#fff;font-weight:600;">Steve Lew Real Estate Group</p>
            <p style="margin:4px 0 0;font-size:12px;color:#999;letter-spacing:0.1em;text-transform:uppercase;">${source}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;">
            <h2 style="margin:0 0 16px;font-size:20px;color:#111;">${title}</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e5e5;border-collapse:collapse;">
              ${rows}
            </table>
            <p style="margin:20px 0 0;font-size:11px;color:#aaa;">Submitted ${new Date().toLocaleString("en-US", { timeZone: "America/Indiana/Indianapolis", dateStyle: "full", timeStyle: "short" })} (Indianapolis time)</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
  }

  const body = await req.json();
  const { type } = body;

  let subject: string;
  let html: string;

  if (type === "contact") {
    const { name, email, phone, message } = body;
    subject = `New Contact Form Submission — ${name}`;
    html = emailTemplate(
      "New Contact Form Submission",
      [
        row("Name", name),
        row("Email", email),
        row("Phone", phone),
        row("Message", message),
      ].join(""),
      "Contact Form · /contact"
    );
  } else if (type === "home-valuation") {
    const { address, name, email, phone } = body;
    subject = `New Home Valuation Request — ${name}`;
    html = emailTemplate(
      "New Home Valuation Request",
      [
        row("Address", address),
        row("Name", name),
        row("Email", email),
        row("Phone", phone),
      ].join(""),
      "Home Valuation · /home-valuation"
    );
  } else {
    return NextResponse.json({ error: "Unknown form type." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Steve Lew RE <onboarding@resend.dev>",
    to: [TO],
    subject,
    html,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
