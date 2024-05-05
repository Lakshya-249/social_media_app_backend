import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function posts(req: Request, res: Response): Promise<void> {
  const { image, text, userId } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const post = await prisma.post.create({
      data: {
        image,
        text,
        userId,
      },
    });
    res.status(201).json(post);
    return;
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export { posts };
