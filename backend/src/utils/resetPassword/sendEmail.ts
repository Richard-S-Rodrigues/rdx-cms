import nodemailer from "nodemailer";
import { compile } from "handlebars";
import fs from "fs";
import { join } from "path";

import { EMAIL_PASSWORD } from "../../config";

interface ISendEmailProps {
  email: string;
  subject: string;
  payload: {
    name: string;
    link?: string;
  };
  template: string;
}

interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  html: unknown;
}

const sendEmail = async ({
  email,
  subject,
  payload,
  template
}: ISendEmailProps) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "richardsouzarodrigues555@gmail.com",
        pass: EMAIL_PASSWORD
      }
    });

    const templateSource = fs.readFileSync(join(__dirname, template), "utf8");
    const compiledTemplate = compile(templateSource);

    const mailOptions: IMailOptions = {
      from: "RdxCMS <richardsouzarodrigues555@gmail.com>",
      to: email,
      subject,
      html: compiledTemplate(payload)
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        return err;
      }
      console.log(`Email sent: ${info.response}`);
      return info;
    });
  } catch (err) {
    return err;
  }
};

export { sendEmail };
