import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import exp from "constants";

const prisma = new PrismaClient();

async function getusername(req: Request, res: Response): Promise<void> {
  const { username } = req.query;
  try {
    const user = await prisma.profile.findMany({
      where: {
        username: {
          startsWith: String(username),
        },
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getfollowedUser(req: Request, res: Response): Promise<void> {
  const { username, userId } = req.query;
  try {
    const user = await prisma.follows.findMany({
      where: {
        followingId: String(userId),
        followedBy: {
          Profile: {
            username: {
              startsWith: String(username),
            },
          },
        },
      },
      select: {
        followedBy: {
          select: {
            Profile: true,
          },
        },
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getallfollowers(req: Request, res: Response): Promise<void> {
  const { userId } = req.query;
  try {
    const user = await prisma.follows.findMany({
      where: {
        followingId: String(userId),
      },
      select: {
        followedBy: {
          select: {
            Profile: true,
          },
        },
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getallfollowing(req: Request, res: Response): Promise<void> {
  const { userId } = req.query;
  try {
    const user = await prisma.follows.findMany({
      where: {
        followedById: String(userId),
      },
      select: {
        following: {
          select: {
            Profile: true,
          },
        },
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export { getusername, getfollowedUser, getallfollowers, getallfollowing };
