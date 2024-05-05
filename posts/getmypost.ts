import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getmyposts(req: Request, res: Response): Promise<void> {
  const { userId } = req.query;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: String(userId),
      },
    });
    if (user == null) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const posts = await prisma.post.findMany({
      where: {
        userId: String(userId),
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export { getmyposts };
