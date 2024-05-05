import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function profile(req: Request, res: Response): Promise<void> {
  const { image, bio, username, userId } = req.body;
  try {
    if (!username || !userId) {
      res.status(400).json({ error: "Bad request" });
      return;
    }
    // console.log(req.body);

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        Profile: null,
      },
    });
    // console.log(user);

    if (user?.id == null) {
      res.status(404).json({ error: "Bad Request" });
      return;
    }
    const profile = await prisma.profile.create({
      data: {
        userId,
        image,
        bio,
        username,
      },
    });
    res.status(201).json(profile);
    return;
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export { profile };
