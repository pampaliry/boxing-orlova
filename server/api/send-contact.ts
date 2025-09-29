import { defineEventHandler, readBody } from 'h3';
import { useRuntimeConfig } from '#imports';
import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  if (!body.name || !body.email || !body.message) {
    return { success: false, error: 'Missing fields' };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.mailUser,
      pass: config.mailPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${body.name}" <${body.email}>`,
      to: config.mailTo,
      subject: 'Správa z kontaktného formulára',
      text: body.message,
    });

    return { success: true };
  } catch (error) {
    console.error('❌ Chyba pri odosielaní emailu:', error);
    return { success: false, error: 'Nepodarilo sa odoslať email' };
  }
});
