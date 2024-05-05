import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function postcomment(req: Request, res: Response): Promise<void> {
  const { userId, postId, text } = req.body;
  try {
    const comment = await prisma.comments.create({
      data: {
        userId,
        postId,
        text,
      },
    });
    res.status(201).json({
      comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export { postcomment };
