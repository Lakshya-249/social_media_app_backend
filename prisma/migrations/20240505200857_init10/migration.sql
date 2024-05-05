/*
  Warnings:

  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `likes_num` on the `Like` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Like" DROP CONSTRAINT "Like_pkey",
DROP COLUMN "likes_num",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Like_pkey" PRIMARY KEY ("id");
