import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const { token } = req.query;
    if (!token) return res.status(400).send({ message: "Invalid token!" });
    const existingTokenCode = await prisma.verificationCode.findUnique({
      where: {
        token: token as string,
      },
    });
    if (!existingTokenCode)
      return res.status(400).send({ message: "Invalid token!" });

    const existingUser = await prisma.user.findFirst({
      where: {
        email: existingTokenCode.email,
      },
    });

    if (!existingUser)
      return res.status(404).send({ message: "User not found!" });

    await prisma.user.update({
      data: {
        emailVerified: new Date(),
      },
      where: {
        id: existingUser.id,
      },
    });

    return res.status(200).send({ message: "Success" });
  }
  return res.status(405).send({ message: "Method not allowed!" });
}
