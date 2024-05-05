import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getuserstory(req: Request, res: Response): Promise<void> {
  const { userId } = req.query;
  try {
    const stories = await prisma.follows.findMany({
      where: {
        followingId: String(userId),
      },
      select: {
        followedBy: {
          select: {
            Story: true,
          },
        },
      },
    });
    res.status(200).json(stories);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function getmystory(req: Request, res: Response): Promise<void> {
  const { userId } = req.query;
  try {
    const story = await prisma.user.findUnique({
      where: {
        id: String(userId),
      },
      include: {
        Story: true,
      },
    });
    res.status(200).json(story);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export { getuserstory, getmystory };
