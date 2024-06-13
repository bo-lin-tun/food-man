// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
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
    const tableId = req.query.tableId?.toString() as string;
    console.log("..", { tableId });

    const table = await prisma.table.findFirst({
      where: {
        id: tableId,
      },
    });
    if (table?.locationId) {
      const location = await prisma.location.findUnique({
        where: { id: table.locationId },
      });

      if (location) {
        const company = await prisma.company.findUnique({
          where: {
            id: location.companyId,
          },
        });

        if (company) {
          return res.status(200).json({ theme: company.mainTheme });
        }
      }
    }

    // if (session && session.email && tableId) {
    //   const existingUser = await prisma.user.findFirst({
    //     where: {
    //       email: session.email,
    //     },
    //   });
    //   if (existingUser && existingUser.email) {
    //     await prisma.company.update({
    //       where: { id: existingUser.companyId },
    //       data: {
    //         mainTheme: updateTheme,
    //       },
    //     });
    //   }
    // }

    return res.status(200).json({ OK: "OK" });
  }
  res.status(405).send("Method now allowed.");
}
