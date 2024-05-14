// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    // Data validation
    const { name, isRequired = true, menuIds } = req.body;
    const isValid = name && menuIds.length > 0;
    if (!isValid) return res.status(400).send("Bad request.");
    const addonCategory = await prisma.addonCategory.create({
      data: { name, isRequired },
    });
    const newMenuAddonCategory: { menuId: number; addonCategoryId: number }[] =
      menuIds.map((item: number) => ({
        menuId: item,
        addonCategoryId: addonCategory.id,
      }));

    const menuAddonCategories = await prisma.$transaction(
      newMenuAddonCategory.map((item) =>
        prisma.menuAddonCategory.create({
          data: {
            menuId: String(item.menuId),
            addonCategoryId: String(item.addonCategoryId),
          },
        })
      )
    );
    return res.status(200).json({ addonCategory, menuAddonCategories });
  } else if (method === "PUT") {
    const { id, name, isRequired, menuIds } = req.body;
    const isValid =
      id && name && isRequired !== undefined && menuIds.length > 0;
    if (!isValid) return res.status(400).send("Bad request.");
    const addonCategory = await prisma.addonCategory.update({
      data: { name, isRequired },
      where: { id },
    });
    // update menuAddonCategory table
    await prisma.menuAddonCategory.deleteMany({
      where: { addonCategoryId: id },
    });
    const menuAddonCategoryData: { addonCategoryId: number; menuId: number }[] =
      menuIds.map((item: number) => ({
        addonCategoryId: id,
        menuId: item,
      }));
    const menuAddonCategories = await prisma.$transaction(
      menuAddonCategoryData.map((item) =>
        prisma.menuAddonCategory.create({
          data: item as any,
        })
      )
    );
    return res.status(200).json({ addonCategory, menuAddonCategories });
  } else if (method === "DELETE") {
    const addonCategoryId = req.query.id;
    const addonCategory = await prisma.addonCategory.findFirst({
      where: { id: addonCategoryId as string },
    });
    if (!addonCategory) return res.status(400).send("Bad request.");
    await prisma.addonCategory.update({
      data: { isArchived: true },
      where: { id: addonCategoryId as string },
    });
    return res.status(200).send("Deleted.");
  }
  res.status(405).send("Method now allowed.");
}
