import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot field: if filled, treat as spam
    if (body.honeypot) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    // Extract fields
    const {
      aiStage,
      firstName,
      lastName,
      company,
      workEmail,
      workPhone,
      projectDescription,
      ndaRequested,
    } = body;

    // Field-specific validation
    const validationErrors: string[] = [];

    if (!aiStage) validationErrors.push('AI Journey Stage is required');
    if (!firstName) validationErrors.push('First Name is required');
    if (!lastName) validationErrors.push('Last Name is required');
    if (!company) validationErrors.push('Company is required');
    if (!workEmail) validationErrors.push('Work Email is required');
    if (!workPhone) validationErrors.push('Work Phone is required');
    if (!projectDescription) validationErrors.push('Project Description is required');

    if (validationErrors.length > 0) {
      return NextResponse.json({ error: validationErrors[0] }, { status: 400 });
    }

    // Email format validation (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(workEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Check if email configuration is available
    if (!process.env.EMAIL_SERVER_HOST || !process.env.EMAIL_SERVER_PORT || !process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD || !process.env.EMAIL_FROM || !process.env.EMAIL_TO) {
      console.error('Missing email configuration environment variables');
      // In development, we might want to log but still return success to avoid breaking the UI
      // In production, we should fail
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
      }
      // For development, simulate success
      console.log('Simulating email send in development mode');
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: Number(process.env.EMAIL_SERVER_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Neural Script Contact Form" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      replyTo: workEmail, // Set Reply-To to the sender's email
      subject: 'New Contact Inquiry — Neural Script',
      text: `
New contact form submission

AI Journey Stage:
${aiStage}

First Name:
${firstName}

Last Name:
${lastName}

Company:
${company}

Work Email:
${workEmail}

Work Phone:
${workPhone}

Project Details:
${projectDescription}

NDA Requested:
${ndaRequested ? 'Yes' : 'No'}

Submitted At:
${new Date().toISOString()}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}