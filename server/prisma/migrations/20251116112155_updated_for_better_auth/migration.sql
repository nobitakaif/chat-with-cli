/*
  Warnings:

  - You are about to drop the column `userId` on the `verification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "verification" DROP CONSTRAINT "verification_userId_fkey";

-- AlterTable
ALTER TABLE "verification" DROP COLUMN "userId";
