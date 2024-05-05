import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deletecomment(req: Request, res: Response): Promise<void> {
  const { id } = req.query;
  try {
    const comment = await prisma.comments.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      message: "Comment deleted successfully",
      comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export { deletecomment };
