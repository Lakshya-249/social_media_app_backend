/*
  Warnings:

  - The primary key for the `Comments` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Comments_pkey" PRIMARY KEY ("id");
