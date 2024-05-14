import * as z from "zod";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { signupSchema } from "@/schemas/auth";
import { prisma } from "@/utils/db";
import { MailTransport } from "@/utils/mail";
import { welcomEmail } from "@/utils/welcome-mail-template";
import { generateRandomNumber } from "@/utils/generate-random";
import { emailVerificationTemplate } from "@/utils/verify-email-template";
import { UserRole } from "@prisma/client";

const SALT_ROUNDS = 10;
const transport = new MailTransport();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const data = req.body;
    try {
      const validatedFields = await signupSchema.safeParseAsync(data);
      if (!validatedFields.success)
        return res.status(400).send({ message: "Invalid fields!" });

      const { name, company, email, password } = validatedFields.data;

      const existingUser = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (existingUser)
        return res.status(400).send({ message: "User already exists!" });

      const hashPass = await bcrypt.hash(password, SALT_ROUNDS);

      const newCompany = await prisma.company.create({
        data: {
          name: company,
        },
      });
      const USER_ROLE: UserRole =
        email === "bolinnhtun6@gmail.com" ? "AMDIN" : "SUB_ADMIN";
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          companyId: newCompany.id,
          password: hashPass,
          role: USER_ROLE,
        },
      });

      await transport.verify();
      await transport.sendMail({
        from: process.env.SMTP_USER,
        to: user.email,
        subject: "Welcome",
        html: welcomEmail({ name: user.name as string }),
      });

      const existingCode = await prisma.verificationCode.findFirst({
        where: {
          email: email,
        },
      });

      if (existingCode) {
        await prisma.verificationCode.delete({
          where: {
            id: existingCode.id,
          },
        });
      }
      const SECRET_CODE = generateRandomNumber(100000, 999999);
      const verifyCode = await prisma.verificationCode.create({
        data: {
          email: user.email,
          token: String(SECRET_CODE),
        },
      });
      const userName = name.charAt(0).toLocaleUpperCase() + name.slice(1);
      const emailVerifyLink = `http://localhost:3000/api/auth/email-verify/${verifyCode.token}`;
      await transport.sendMail({
        from: user.email,
        to: process.env.SMTP_USER,
        subject: "Account Verification Request",
        html: emailVerificationTemplate({
          name: userName,
          verifyLink: emailVerifyLink,
        }),
      });

      return res.status(200).send({ message: "Verification email sent!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).send({ message: error.issues[0].message });
      }
      return res.status(500).send({ message: "Oops! something went wrong!" });
    }
  }
  return res.status(405).send({ message: "Method Not Allowed!" });
}
