import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deletemsg(req: Request, res: Response): Promise<void> {
  const { id } = req.query;
  try {
    const msg = await prisma.messages.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "Message deleted", data: msg });
    return;
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export { deletemsg };
