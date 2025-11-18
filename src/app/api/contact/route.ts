import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Verify reCAPTCHA token with Google
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error('[contact] RECAPTCHA_SECRET_KEY is not set');
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[contact] reCAPTCHA verification result:', data);
    }

    return data.success === true;
  } catch (error) {
    console.error('[contact] reCAPTCHA verification error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, service, recaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification is required' },
        { status: 400 }
      );
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    
    if (!isRecaptchaValid) {
      console.warn('[contact] Invalid reCAPTCHA token for:', email);
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Save contact form submission to database
    try {
      const contact = await prisma.contact.create({
        data: {
          name: name.trim(),
          email: email.toLowerCase().trim(),
          phone: phone?.trim() || null,
          company: company?.trim() || null,
          subject: service ? `${service} - Inquiry` : 'General Inquiry',
          message: message.trim(),
        },
      });

      // In production, you would send email notification here
      // For now, we'll just log it
      if (process.env.NODE_ENV === 'development') {
        console.log('[contact] Contact form submitted:', {
          id: contact.id,
          email: contact.email,
          service: contact.subject,
        });
      }

      return NextResponse.json(
        { 
          success: true,
          message: 'Thank you for contacting us! We will get back to you within 24 hours.',
          id: contact.id
        },
        { status: 200 }
      );
    } catch (dbError) {
      console.error('[contact] Database error:', dbError);
      
      // Even if database save fails, we can still return success
      // (in case of temporary DB issues, we don't want to lose the submission)
      // In production, you might want to queue this or send directly to email
      
      return NextResponse.json(
        { 
          success: true,
          message: 'Thank you for contacting us! We will get back to you within 24 hours.',
          warning: 'Your message was received but could not be saved to our database. Please contact us directly if urgent.'
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('[contact] Contact form error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        error: 'Failed to submit contact form. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}

