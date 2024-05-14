import { prisma } from "@/utils/db";
import { Order } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const orders = req.body as Order[];
    if (!orders.length)
      return res.status(400).send({ message: "Bad Request!" });

    try {
      orders.map(async (item) => {
        await prisma.order.update({
          data: {
            isArchived: true,
          },
          where: {
            id: item.id,
          },
        });
      });

      return res.status(200).send({ data: "Successful!" });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error!" });
    }
  }
  return res.status(405).send("Method Not Allowed");
}
