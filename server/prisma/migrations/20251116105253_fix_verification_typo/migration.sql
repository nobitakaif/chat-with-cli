-- DropForeignKey
ALTER TABLE "verification" DROP CONSTRAINT "verification_userId_fkey";

-- AlterTable
ALTER TABLE "verification" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "verification" ADD CONSTRAINT "verification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
