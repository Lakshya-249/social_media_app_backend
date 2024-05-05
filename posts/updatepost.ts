import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updatepost(req: Request, res: Response): Promise<void> {
  const { userId, image, text, id } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user == null) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const post = await prisma.post.update({
      where: {
        id,
      },
      data: {
        image,
        text,
      },
    });
    res.status(201).json(post);
    return;
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export { updatepost };
