import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { log } from "console";

const prisma = new PrismaClient();

async function getmessage(req: Request, res: Response): Promise<void> {
  const { user1, user2 } = req.query;
  try {
    if (!user1 || !user2) {
      res.status(400).json({ error: "Bad request" });
      return;
    }
    const message = await prisma.messages.findMany({
      where: {
        OR: [
          { senderId: String(user1), recieverId: String(user2) },
          { senderId: String(user2), recieverId: String(user1) },
        ],
      },
      orderBy: {
        time: "asc",
      },
    });
    res.status(200).json(message);
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getuserfromMsg(req: Request, res: Response): Promise<void> {
  const { user } = req.query;
  try {
    if (!user) {
      res.status(400).json({ error: "Bad request" });
      return;
    }
    const message = await prisma.messages.findMany({
      where: {
        senderId: String(user),
      },
      select: {
        recieverId: true,
      },
      distinct: ["recieverId"],
    });
    if (!message) {
      res.status(404).json({ value: "none" });
      return;
    }
    log(message);
    const rec_user = await prisma.profile.findMany({
      where: {
        userId: {
          in: message.map((m) => m.recieverId),
        },
      },
      select: {
        userId: true,
        image: true,
        username: true,
      },
    });
    res.status(200).json(rec_user);
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export { getmessage, getuserfromMsg };
