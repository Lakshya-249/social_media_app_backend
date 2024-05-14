/*
  Warnings:

  - You are about to drop the column `Gender` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "Gender",
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "social_media" TEXT;
