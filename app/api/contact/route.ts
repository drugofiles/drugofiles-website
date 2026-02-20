import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import nodemailer from 'nodemailer'

// Create Zoho SMTP transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, message, projectType, sendEmail } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nome e contatto sono richiesti' },
        { status: 400 }
      )
    }

    // Save to database
    const contact = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        company: company || null,
        message: message || '',
        service: projectType || null,
      },
    })

    // Send email notification
    if (sendEmail) {
      try {
        const htmlBody = `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #dedacf; padding: 40px;">
            <div style="background: #0D1321; padding: 30px; border-radius: 16px;">
              <h1 style="color: #DFD295; font-size: 24px; margin: 0 0 20px 0; border-bottom: 2px solid #7353BA; padding-bottom: 15px;">
                🎬 Nuova richiesta di contatto
              </h1>
              
              <div style="background: rgba(255,248,240,0.05); padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="color: #FFF8F0; margin: 10px 0;"><strong style="color: #DFD295;">Nome:</strong> ${name}</p>
                <p style="color: #FFF8F0; margin: 10px 0;"><strong style="color: #DFD295;">Email:</strong> <a href="mailto:${email}" style="color: #7353BA;">${email}</a></p>
                ${company ? `<p style="color: #FFF8F0; margin: 10px 0;"><strong style="color: #DFD295;">Azienda:</strong> ${company}</p>` : ''}
                ${projectType ? `<p style="color: #FFF8F0; margin: 10px 0;"><strong style="color: #DFD295;">Tipo progetto:</strong> ${projectType}</p>` : ''}
              </div>
              
              ${message ? `
              <div style="margin: 20px 0;">
                <p style="color: #DFD295; margin: 0 0 10px 0;"><strong>Messaggio:</strong></p>
                <div style="background: rgba(255,248,240,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #7353BA;">
                  <p style="color: #FFF8F0; margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              ` : ''}
              
              <p style="color: rgba(255,248,240,0.5); font-size: 12px; margin-top: 30px; border-top: 1px solid rgba(255,248,240,0.1); padding-top: 15px;">
                Inviato il: ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}
              </p>
            </div>
          </div>
        `

        await transporter.sendMail({
          from: `"Drugofiles Productions" <${process.env.SMTP_USER}>`,
          to: process.env.CONTACT_EMAIL || 'info@drugofiles.com',
          replyTo: email,
          subject: `[Drugofiles] Nuova richiesta da ${name}`,
          html: htmlBody,
        })

        console.log('Email sent successfully to', process.env.CONTACT_EMAIL)
      } catch (emailError) {
        console.error('Email sending failed:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      { success: true, message: 'Messaggio inviato con successo', id: contact.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: "Errore durante l'invio del messaggio" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const contacts = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Errore durante il recupero dei contatti' },
      { status: 500 }
    )
  }
}
