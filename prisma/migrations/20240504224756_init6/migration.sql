/*
  Warnings:

  - The primary key for the `Story` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Story" DROP CONSTRAINT "Story_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Story_pkey" PRIMARY KEY ("id");
