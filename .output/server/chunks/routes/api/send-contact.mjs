import { d as defineEventHandler, e as readBody, b as useRuntimeConfig } from '../../_/nitro.mjs';
import nodemailer from 'nodemailer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue';
import 'consola';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'ipx';
import 'node:path';

const sendContact = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  if (!body.name || !body.email || !body.message) {
    return { success: false, error: "Missing fields" };
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.mailUser,
      pass: config.mailPass
    }
  });
  try {
    await transporter.sendMail({
      from: `"${body.name}" <${body.email}>`,
      to: config.mailTo,
      subject: "Spr\xE1va z kontaktn\xE9ho formul\xE1ra",
      text: body.message
    });
    return { success: true };
  } catch (error) {
    console.error("\u274C Chyba pri odosielan\xED emailu:", error);
    return { success: false, error: "Nepodarilo sa odosla\u0165 email" };
  }
});

export { sendContact as default };
//# sourceMappingURL=send-contact.mjs.map
