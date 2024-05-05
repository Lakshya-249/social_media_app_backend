import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createUser(req: Request, res: Response): Promise<void> {
  //   console.log(req.body);
  const { id, name } = req.body;

  try {
    // Check if the user already exists
    const user = await prisma.user.upsert({
      where: { id },
      update: {},
      create: { id, name },
    });
    console.log(user);

    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export { createUser };
