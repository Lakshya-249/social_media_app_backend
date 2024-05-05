import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deletePost(req: Request, res: Response): Promise<void> {
  const { id, userId } = req.query;
  try {
    if (!id || !userId) {
      res.status(400).json({ error: "Bad request" });
      return;
    }
    const user = await prisma.user.findFirst({
      where: {
        id: String(userId),
        Post: {
          some: {
            id: Number(id),
          },
        },
      },
    });

    if (user == null) {
      res.status(400).json({ error: "Bad request" });
      return;
    }
    const post = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(post);
    return;
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export { deletePost };
