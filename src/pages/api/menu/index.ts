// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("Unauthorized");
  const method = req.method;
  if (method === "POST") {
    const { name, price, menuCategoryIds } = req.body;
    const isValid = name && price !== undefined;
    if (!isValid) return res.status(400).send("Bad request.");
    const newMenu = await prisma.menu.create({ data: { name, price } });
    const newMenuCategoryMenu = menuCategoryIds.map((item: number) => ({
      menuCategoryId: item,
      menuId: newMenu.id,
    }));
    newMenuCategoryMenu.forEach(
      async (item: { menuCategoryId: number; menuId: number }) =>
        await prisma.menuCategoryMenu.create({
          data: { menuCategoryId: item.menuCategoryId, menuId: item.menuId },
        })
    );
    return res.status(200).json(newMenu);
  } else if (method === "PUT") {
    const { id, name, price, menuCategoryIds } = req.body;
    const isValid =
      id && name && price !== undefined && menuCategoryIds.length > 0;
    if (!isValid) return res.status(400).send("Bad request.");
    const menu = await prisma.menu.update({
      data: { name, price },
      where: { id },
    });
    // update menuCategoryMenu table
    await prisma.menuCategoryMenu.deleteMany({ where: { menuId: id } });
    const menuCategoryMenus = menuCategoryIds.map((item: number) => ({
      menuId: id,
      menuCategoryId: item,
    }));
    const menuCategoryMenu = await prisma.$transaction(
      menuCategoryMenus.map(
        (item: { menuId: number; menuCategoryId: number }) =>
          prisma.menuCategoryMenu.create({
            data: { menuId: item.menuId, menuCategoryId: item.menuCategoryId },
          })
      )
    );
    return res.status(200).json({ menu, menuCategoryMenu });
  }
  res.status(405).send("Method not allowed.");
}
