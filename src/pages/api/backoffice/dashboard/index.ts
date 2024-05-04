import { prisma } from "@/utils/db";
import { calculateDailySales, calculateMonthlySales } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // const ordersWithinCurrentMonth = await prisma.order.findMany({
    //   where: {
    //     createdAt: {
    //       // Filter orders where createdAt is greater than or equal to the start of the current month
    //       gte: startOfMonth,
    //       // Filter orders where createdAt is less than or equal to the end of the current month
    //       lte: endOfMonth,
    //     },
    //   },
    // });

    const totalOrders = await prisma.order.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    const ordersWithinCurrentMonth = totalOrders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startOfMonth && orderDate <= endOfMonth;
    });

    const dailyOrders = calculateDailySales(ordersWithinCurrentMonth);

    const monthlyOrders = calculateMonthlySales(totalOrders);

    return res.status(200).send({ daily: dailyOrders, monthly: monthlyOrders });
  }
  res.status(405).send("Method now allowed.");
}
