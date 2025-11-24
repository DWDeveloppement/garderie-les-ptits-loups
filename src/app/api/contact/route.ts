import { NextRequest, NextResponse } from 'next/server';

import { ContactFormData } from '@/scripts/contactForm';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Fonction pour valider le token reCAPTCHA v2
async function validateRecaptchaToken(token: string): Promise<boolean> {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.warn('RECAPTCHA_SECRET_KEY non configurée');
    return true; // En mode développement, on accepte sans validation
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    });

    const data = await response.json();
    console.log('Validation reCAPTCHA v2:', { success: data.success, hostname: data.hostname });

    // reCAPTCHA v2 retourne success: true/false
    return data.success === true;
  } catch (error) {
    console.error('Erreur validation reCAPTCHA v2:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactFormData = await request.json();

    // Vérifier que les variables d'environnement sont définies
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY non configurée');
    }

    if (!process.env.RESEND_TO_EMAIL) {
      throw new Error('RESEND_TO_EMAIL non configurée');
    }

    const { nom, prenom, email, phone, sujet, message, website, recaptchaToken } = formData;

    // Validation du champ honeypot (anti-bot)
    if (website && website.trim().length > 0) {
      console.warn('Suspicion de bot détectée - champ honeypot rempli:', website);
      return NextResponse.json(
        {
          success: false,
          error: 'Suspicion de bot détectée',
          details: 'Le formulaire semble être soumis par un bot'
        },
        { status: 400 }
      );
    }

    // Validation reCAPTCHA
    if (recaptchaToken) {
      const isValidRecaptcha = await validateRecaptchaToken(recaptchaToken);
      if (!isValidRecaptcha) {
        return NextResponse.json(
          {
            success: false,
            error: 'Échec de la vérification de sécurité',
            details: 'Token reCAPTCHA invalide ou score trop faible'
          },
          { status: 400 }
        );
      }
    } else {
      console.warn('Aucun token reCAPTCHA fourni');
    }

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.RESEND_TO_EMAIL,
      replyTo: email, // L'utilisateur peut répondre directement
      subject: `[Contact Garderie] ${sujet} - ${prenom} ${nom}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B5CF6; border-bottom: 2px solid #8B5CF6; padding-bottom: 10px;">
            Nouveau message de contact - Garderie Les P'tits Loups
          </h2>
          
          <div style="background-color: #FEF3C7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #92400E;">Informations du contact</h3>
            <p style="margin: 5px 0;"><strong>Nom :</strong> ${prenom} ${nom}</p>
            <p style="margin: 5px 0;"><strong>Email :</strong> ${email}</p>
			<p style="margin: 5px 0;"><strong>Téléphone :</strong> ${phone}</p>
            <p style="margin: 5px 0;"><strong>Sujet :</strong> ${sujet}</p>
          </div>
          
          <div style="background-color: #F3F4F6; padding: 15px; border-radius: 8px;">
            <h3 style="margin: 0 0 10px 0; color: #374151;">Message</h3>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #E5E7EB; font-size: 12px; color: #6B7280;">
            <p>Ce message a été envoyé via le formulaire de contact du site web de la Garderie Les P'tits Loups.</p>
            <p>Vous pouvez répondre directement à cet email pour contacter ${prenom} ${nom}.</p>
          </div>
        </div>
      `
    });

    return NextResponse.json({
      success: true,
      message: 'Email envoyé avec succès',
      data
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de l'envoi de l'email",
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}
