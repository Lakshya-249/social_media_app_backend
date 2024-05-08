import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function sendmessage(req: Request, res: Response): Promise<void> {
  const { sender, reciever, text } = req.body;
  try {
    if (!sender || !reciever) {
      res.status(404).json({ error: "sender or reciever not found" });
      return;
    }
    const roomid = await prisma.room.findFirst({
      where: {
        AND: [
          {
            RoomUser: {
              some: {
                userId: sender,
              },
            },
          },
          {
            RoomUser: {
              some: {
                userId: reciever,
              },
            },
          },
        ],
      },
      select: {
        id: true,
      },
    });

    if (roomid?.id == null) {
      res.status(404).json({ error: "room not found" });
      return;
    }

    const message = await prisma.messages.create({
      data: {
        text: text,
        roomId: roomid.id,
        senderId: sender,
        recieverId: reciever,
      },
    });

    res.status(201).json(message);
    return;
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export { sendmessage };
