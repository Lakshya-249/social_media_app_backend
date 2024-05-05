import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { equal } from "assert";

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
        time: "desc",
      },
    });
    res.status(200).json(message);
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export { getmessage };
