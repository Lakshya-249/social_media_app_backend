import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function likepost(req: Request, res: Response): Promise<void> {
  const { userId, postId } = req.body;
  try {
    const likes = await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
    res.status(201).json({
      likes,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function deletelike(req: Request, res: Response): Promise<void> {
  const { userId, postId } = req.query;
  try {
    const likes = await prisma.like.delete({
      where: {
        likedBy: {
          userId: String(userId),
          postId: Number(postId),
        },
      },
    });
    res.status(200).json({
      likes,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export { likepost, deletelike };
