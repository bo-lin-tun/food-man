import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const table = await prisma.table.findFirst();

    if (!table) return res.status(400).send("Bad request");
    return res.status(200).json(table);
  }
  res.status(405).send("Method not allowed.");
}
