/*
  Warnings:

  - Added the required column `likes_num` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "likes_num" INTEGER NOT NULL;
