-- CreateTable
CREATE TABLE "Comments" (
    "postId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("postId","userId")
);

-- CreateTable
CREATE TABLE "Story" (
    "userId" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Story_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
