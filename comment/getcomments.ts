import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getcomments(req: Request, res: Response): Promise<void> {
  const { postId } = req.query;
  try {
    if (!postId) {
      res.status(400).json({ error: "Bad request" });
      return;
    }
    const comments = await prisma.comments.findMany({
      where: {
        postId: Number(postId),
      },
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export { getcomments };
