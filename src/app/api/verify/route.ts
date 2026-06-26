import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, interest } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.LEAD_TO_EMAIL || "sj@121insure.com";

    if (!host || !user || !pass) {
      console.log("Lead captured without SMTP:", { fullName, email, phone, interest, capturedAt: new Date().toISOString() });
      return NextResponse.json({ ok: true, mode: "logged-only" });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

    await transporter.sendMail({
      from: `GIFT City Feeder Portal <${user}>`,
      to,
      subject: "New qualified feeder fund inquiry",
      text: [
        "New qualified inquiry received from the GIFT City Feeder Fund Portal.",
        "",
        `Full Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Interest: ${interest || "Not specified"}`,
        `Captured At: ${new Date().toISOString()}`
      ].join("\n")
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
