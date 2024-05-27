import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function followuser(req: Request, res: Response): Promise<void> {
  const { followerId, followedId } = req.body;
  try {
    if (!followedId || !followerId) {
      res.status(404).json({ error: "bad request.." });
      return;
    }
    const [follower, followed] = await Promise.all([
      prisma.user.findUnique({
        where: {
          id: followerId,
        },
      }),
      prisma.user.findUnique({
        where: {
          id: followedId,
        },
      }),
    ]);

    if (!follower || !followed) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const follow = await prisma.follows.create({
      data: {
        followedById: followedId,
        followingId: followerId,
      },
    });

    const findroom = await prisma.room.findFirst({
      where: {
        AND: [
          {
            RoomUser: {
              some: {
                userId: followedId,
              },
            },
          },
          {
            RoomUser: {
              some: {
                userId: followerId,
              },
            },
          },
        ],
      },
    });
    if (findroom !== null) {
      res.status(200).json({ success: true, data: { follow, findroom } });
      console.log(findroom);
      return;
    }

    const room = await prisma.room.create({
      data: {
        roomname: `${follower.name}_${followed.name}`,
        RoomUser: {
          create: [{ userId: followerId }, { userId: followedId }],
        },
      },
    });

    res.status(200).json({ success: true, data: { follow, room } });
    return;
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function unfollowuser(req: Request, res: Response): Promise<void> {
  const { userId, followerId } = req.query;
  try {
    const user = await prisma.follows.delete({
      where: {
        followees: {
          followedById: String(userId),
          followingId: String(followerId),
        },
      },
    });
    res
      .status(200)
      .json({ success: true, data: user, message: "unfollowed succesfully" });
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export { followuser, unfollowuser };
