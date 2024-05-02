/*
  Warnings:

  - The primary key for the `Addon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `AddonCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DisabledLocationMenu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DisabledLocationMenuCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MenuAddonCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MenuCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MenuCategoryMenu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Table` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('AMDIN', 'SUB_ADMIN');

-- DropForeignKey
ALTER TABLE "Addon" DROP CONSTRAINT "Addon_addonCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "DisabledLocationMenu" DROP CONSTRAINT "DisabledLocationMenu_locationId_fkey";

-- DropForeignKey
ALTER TABLE "DisabledLocationMenu" DROP CONSTRAINT "DisabledLocationMenu_menuId_fkey";

-- DropForeignKey
ALTER TABLE "DisabledLocationMenuCategory" DROP CONSTRAINT "DisabledLocationMenuCategory_locationId_fkey";

-- DropForeignKey
ALTER TABLE "DisabledLocationMenuCategory" DROP CONSTRAINT "DisabledLocationMenuCategory_menuCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_companyId_fkey";

-- DropForeignKey
ALTER TABLE "MenuAddonCategory" DROP CONSTRAINT "MenuAddonCategory_addonCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "MenuAddonCategory" DROP CONSTRAINT "MenuAddonCategory_menuId_fkey";

-- DropForeignKey
ALTER TABLE "MenuCategory" DROP CONSTRAINT "MenuCategory_companyId_fkey";

-- DropForeignKey
ALTER TABLE "MenuCategoryMenu" DROP CONSTRAINT "MenuCategoryMenu_menuCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "MenuCategoryMenu" DROP CONSTRAINT "MenuCategoryMenu_menuId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_addonId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_menuId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_tableId_fkey";

-- DropForeignKey
ALTER TABLE "Table" DROP CONSTRAINT "Table_locationId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyId_fkey";

-- AlterTable
ALTER TABLE "Addon" DROP CONSTRAINT "Addon_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "addonCategoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Addon_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Addon_id_seq";

-- AlterTable
ALTER TABLE "AddonCategory" DROP CONSTRAINT "AddonCategory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "AddonCategory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AddonCategory_id_seq";

-- AlterTable
ALTER TABLE "Company" DROP CONSTRAINT "Company_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "township" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Company_id_seq";

-- AlterTable
ALTER TABLE "DisabledLocationMenu" DROP CONSTRAINT "DisabledLocationMenu_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "locationId" SET DATA TYPE TEXT,
ALTER COLUMN "menuId" SET DATA TYPE TEXT,
ADD CONSTRAINT "DisabledLocationMenu_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DisabledLocationMenu_id_seq";

-- AlterTable
ALTER TABLE "DisabledLocationMenuCategory" DROP CONSTRAINT "DisabledLocationMenuCategory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "locationId" SET DATA TYPE TEXT,
ALTER COLUMN "menuCategoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "DisabledLocationMenuCategory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DisabledLocationMenuCategory_id_seq";

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "companyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Location_id_seq";

-- AlterTable
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Menu_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Menu_id_seq";

-- AlterTable
ALTER TABLE "MenuAddonCategory" DROP CONSTRAINT "MenuAddonCategory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "menuId" SET DATA TYPE TEXT,
ALTER COLUMN "addonCategoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MenuAddonCategory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MenuAddonCategory_id_seq";

-- AlterTable
ALTER TABLE "MenuCategory" DROP CONSTRAINT "MenuCategory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "companyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MenuCategory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MenuCategory_id_seq";

-- AlterTable
ALTER TABLE "MenuCategoryMenu" DROP CONSTRAINT "MenuCategoryMenu_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "menuCategoryId" SET DATA TYPE TEXT,
ALTER COLUMN "menuId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MenuCategoryMenu_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MenuCategoryMenu_id_seq";

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "menuId" SET DATA TYPE TEXT,
ALTER COLUMN "addonId" SET DATA TYPE TEXT,
ALTER COLUMN "tableId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Order_id_seq";

-- AlterTable
ALTER TABLE "Table" DROP CONSTRAINT "Table_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "locationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Table_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Table_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "password" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'SUB_ADMIN',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "companyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "VerificationCode" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "VerificationCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_token_key" ON "VerificationCode"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_email_token_key" ON "VerificationCode"("email", "token");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuCategory" ADD CONSTRAINT "MenuCategory_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabledLocationMenuCategory" ADD CONSTRAINT "DisabledLocationMenuCategory_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabledLocationMenuCategory" ADD CONSTRAINT "DisabledLocationMenuCategory_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "MenuCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabledLocationMenu" ADD CONSTRAINT "DisabledLocationMenu_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabledLocationMenu" ADD CONSTRAINT "DisabledLocationMenu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuCategoryMenu" ADD CONSTRAINT "MenuCategoryMenu_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "MenuCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuCategoryMenu" ADD CONSTRAINT "MenuCategoryMenu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuAddonCategory" ADD CONSTRAINT "MenuAddonCategory_addonCategoryId_fkey" FOREIGN KEY ("addonCategoryId") REFERENCES "AddonCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuAddonCategory" ADD CONSTRAINT "MenuAddonCategory_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addon" ADD CONSTRAINT "Addon_addonCategoryId_fkey" FOREIGN KEY ("addonCategoryId") REFERENCES "AddonCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addonId_fkey" FOREIGN KEY ("addonId") REFERENCES "Addon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
