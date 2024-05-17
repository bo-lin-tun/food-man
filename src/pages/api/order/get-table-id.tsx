// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CartItem } from "@/types/cart";
import { prisma } from "@/utils/db";
import { getCartTotalPrice, getOrderTotalPrice } from "@/utils/generals";
import { NextApiResponseWithSocket } from "@/utils/server";
import { ORDERSTATUS, Order } from "@prisma/client";
import { nanoid } from "nanoid";
import type { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  const method = req.method;
  if (method === "GET") {
    const table = await prisma.table.findFirst();

    if (!table) return res.status(400).send("Bad request");
    return res.status(200).json(table);
  }
  res.status(405).send("Method not allowed.");
}
