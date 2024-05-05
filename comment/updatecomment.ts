import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updatecomment(req: Request, res: Response): Promise<void> {
  const { id, text } = req.body;
  try {
    const comment = await prisma.comments.update({
      where: {
        id: Number(id),
      },
      data: {
        text: text,
      },
    });
    res.status(200).json({
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export { updatecomment };
