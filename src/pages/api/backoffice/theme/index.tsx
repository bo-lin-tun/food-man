// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import { getQrCodeUrl, qrCodeImageUpload } from "@/utils/fileUpload";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    console.log(req.query);
    const session = await getToken({
      req: req,
    });

    const updateTheme = req.query.theme?.toString() as string;

    if (session && session.email && updateTheme) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: session.email,
        },
      });
      if (existingUser && existingUser.email) {
        await prisma.company.update({
          where: { id: existingUser.companyId },
          data: {
            mainTheme: updateTheme,
          },
        });
      }
    }

    return res.status(200).json({ OK: "OK" });
  }
  res.status(405).send("Method now allowed.");
}
