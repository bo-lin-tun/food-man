-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('AMDIN', 'SUB_ADMIN');

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "township" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "password" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'SUB_ADMIN';

-- CreateTable
CREATE TABLE "VerificationCode" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "VerificationCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_token_key" ON "VerificationCode"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_email_token_key" ON "VerificationCode"("email", "token");
