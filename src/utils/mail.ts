import nodemailer, { type SendMailOptions } from "nodemailer";

export class MailTransport {
  private transport: nodemailer.Transporter;
  constructor() {
    this.transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async verify() {
    try {
      await this.transport.verify();
    } catch (error) {
      console.log("transport verify error: ", error);
      throw new Error("Failed to verify email transport");
    }
  }

  async sendMail(options: SendMailOptions) {
    try {
      await this.transport.sendMail(options);
    } catch (error) {
      console.log("send mail error: ", error);
      throw new Error("Failed to send email");
    }
  }
}
