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

function formatted_date() {
  var result = "";
  var d = new Date(Date.now() - 1000 * 60 * 60 * 24 * 14);
  result +=
    d.getFullYear() +
    "-" +
    (d.getMonth() + 1) +
    "-" +
    d.getDate() +
    " " +
    d.getHours() +
    ":" +
    d.getMinutes() +
    ":" +
    d.getSeconds() +
    " " +
    d.getMilliseconds();
  return result;
}

console.log(formatted_date());

async function getuserfromMsg(req: Request, res: Response): Promise<void> {
  const { user } = req.query;
  try {
    if (!user) {
      res.status(400).json({ error: "Bad request" });
      return;
    }
    const message = await prisma.messages.findMany({
      where: {
        OR: [{ senderId: String(user) }, { recieverId: String(user) }],
        time: {
          gte: formatted_date(),
        },
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
        bio: true,
      },
    });
    res.status(200).json(rec_user);
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export { getmessage, getuserfromMsg };
