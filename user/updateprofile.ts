import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateprofile(req: Request, res: Response): Promise<void> {
  const { userId, image, bio, username } = req.body;
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
    const profile = await prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        image,
        bio,
        username,
      },
    });
    res.status(200).json(profile);
    return;
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export { updateprofile };
