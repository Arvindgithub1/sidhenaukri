// src/app/api/contact/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, message, phone } = await request.json();

    if (!name || !email || !message || !phone) {
      return NextResponse.json({ error: 'Sab fields zaroori hain' }, { status: 400 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'SidheNaukri Contact <contact@sidhenaukri.in>',
        to: ['sidhenaukri@gmail.com'],
        reply_to: email,
        subject: `New Contact Form: ${name} — SidheNaukri.in`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1a3fa3; padding: 20px; border-radius: 8px 8px 0 0;">
              <h2 style="color: #fff; margin: 0;">New Contact Form Submission</h2>
              <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 14px;">SidheNaukri.in</p>
            </div>
            <div style="background: #f8f9fd; padding: 24px; border: 1px solid #e0e4ee; border-top: none; border-radius: 0 0 8px 8px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #666; font-size: 14px; width: 120px;"><strong>Name:</strong></td>
                  <td style="padding: 10px 0; color: #222; font-size: 14px;">${name}</td>
                </tr>
                <tr style="border-top: 1px solid #eee;">
                  <td style="padding: 10px 0; color: #666; font-size: 14px;"><strong>Email:</strong></td>
                  <td style="padding: 10px 0; color: #1a3fa3; font-size: 14px;">${email}</td>
                </tr>
                ${phone ? `
                <tr style="border-top: 1px solid #eee;">
                  <td style="padding: 10px 0; color: #666; font-size: 14px;"><strong>Phone:</strong></td>
                  <td style="padding: 10px 0; color: #222; font-size: 14px;">${phone}</td>
                </tr>` : ''}
                <tr style="border-top: 1px solid #eee;">
                  <td style="padding: 10px 0; color: #666; font-size: 14px; vertical-align: top;"><strong>Message:</strong></td>
                  <td style="padding: 10px 0; color: #222; font-size: 14px; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
                </tr>
              </table>
              <div style="margin-top: 20px; padding: 12px; background: #eef1fb; border-radius: 6px; font-size: 12px; color: #666;">
                Sent from SidheNaukri.in Contact Form
              </div>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Email send failed');
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}