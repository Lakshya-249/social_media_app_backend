import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getuserposts(req: Request, res: Response): Promise<void> {
  const { userId } = req.query;
  try {
    if (!userId) {
      res.status(400).json({ error: "Bad request" });
      return;
    }
    const user = await prisma.user.findUnique({
      where: {
        id: String(userId),
      },
    });
    if (user == null) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const posts = await prisma.follows.findMany({
      where: {
        followingId: String(userId),
      },
      include: {
        followedBy: {
          select: {
            id: true,
            Post: true,
            Profile: {
              select: {
                username: true,
                image: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export { getuserposts };
