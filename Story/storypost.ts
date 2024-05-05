import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function postStory(req: Request, res: Response): Promise<void> {
  const { userId, images } = req.body;
  try {
    const story = await prisma.story.create({
      data: {
        userId,
        images,
      },
    });
    res.status(201).json({
      message: "Story created successfully",
      story,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function deleteStory(req: Request, res: Response): Promise<void> {
  const { id } = req.query;
  try {
    const story = await prisma.story.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      message: "Story deleted successfully",
      story,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

export { postStory, deleteStory };
