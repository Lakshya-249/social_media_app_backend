import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getuserlikes(req: Request, res: Response): Promise<void> {
  const { postId } = req.query;
  try {
    const user = await prisma.like.findMany({
      where: {
        postId: Number(postId),
      },
      select: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    const numberoflikes: Number = user.length;
    res.status(200).json({
      user,
      numberoflikes,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function ifLiked(req: Request, res: Response): Promise<void> {
  const { userId, postId } = req.query;
  try {
    const user = await prisma.like.findUnique({
      where: {
        likedBy: {
          userId: String(userId),
          postId: Number(postId),
        },
      },
    });
    if (user !== null) {
      res.status(200).json({ value: true });
      return;
    } else {
      res.status(200).json({ value: false });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export { getuserlikes, ifLiked };
