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
    const today = new Date();

    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);
    const isValid = req.query.orderSeq;
    if (!isValid) return res.status(400).send("Bad request");
    const orderSeq = String(req.query.orderSeq);

    const exist = await prisma.order.findMany({
      where: {
        orderSeq,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
         },
      },
    });

    if (!exist) return res.status(400).send("Bad request");
    return res.status(200).json({ orders: exist });
  } else if (method === "POST") {
    const { tableId, cartItems } = req.body;
    // console.log("cartItem: ", cartItems);
    const isValid = tableId && cartItems.length;
    if (!isValid) return res.status(400).send("Bad request.");
    const foundedTable = await prisma.table.findFirst({
      where: {
        id: tableId,
      },
    });
    if (!foundedTable) return res.status(400).send("Bad request.");
    const order = await prisma.order.findFirst({
      where: {
        tableId,
        status: { in: [ORDERSTATUS.PENDING, ORDERSTATUS.COOKING] },
      },
    });
    const orderSeq = order ? order.orderSeq : nanoid();
    const totalPrice = order
     ? order.totalPrice + getCartTotalPrice(cartItems)
     : getCartTotalPrice(cartItems);
    
    let new_orders = [] as Order[];
    for (const item of cartItems) {
      const cartItem = item as CartItem;
      const hasAddons = cartItem.addons.length > 0;
      const totalPrice = getOrderTotalPrice(cartItem);
      if (hasAddons) {
        for (const addon of cartItem.addons) {
          const newOrder = await prisma.order.create({
            data: {
              menuId: cartItem.menu.id,
              addonId: addon.id,
              quantity: cartItem.quantity,
              orderSeq,
              itemId: cartItem.id,
              status: ORDERSTATUS.PENDING,
              totalPrice,
              tableId,
            },
          });
          new_orders.push(newOrder);
        }
      } else {
        const newOrder = await prisma.order.create({
          data: {
            menuId: cartItem.menu.id,
            quantity: cartItem.quantity,
            orderSeq,
            itemId: cartItem.id,
            status: ORDERSTATUS.PENDING,
            totalPrice,
            tableId,
          },
        });
        new_orders.push(newOrder);
      }
    }
    await prisma.order.updateMany({
     data: { totalPrice },
      where: { orderSeq },
   });
    res?.socket?.server?.io?.emit("new_order", {
      orders: new_orders,
      table: foundedTable,
    });
    const orders = await prisma.order.findMany({ where: { orderSeq } });
    return res.status(200).json({ orders });
  } else if (method === "PUT") {
    const itemId = String(req.query.itemId);
    const isValid = itemId && req.body.status;
    if (!isValid) return res.status(400).send({ message: "Bad request" });
    const exist = await prisma.order.findFirst({
      where: { id: itemId, isArchived: false },
    });
    if (!exist) return res.status(400).send({ message: "Bad request" });
    const existingTable = await prisma.table.findFirst({
      where: {
        id: exist.tableId,
      },
    });
    if (!existingTable) return res.status(400).send({ message: "Bad request" });
    const updatedOrder = await prisma.order.update({
      where: {
        id: exist.id,
      },
      data: {
        status: req.body.status as ORDERSTATUS,
      },
    });

    const orders = await prisma.order.findMany({
      where: {
        isArchived: false,
      },
    });

    return res.status(200).json({ orders });
  }
  res.status(405).send("Method not allowed.");
}
