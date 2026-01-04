-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('unlisted', 'private');

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "youtubeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "note" TEXT,
    "shotAt" DATE NOT NULL,
    "eventTags" TEXT[],
    "durationSec" INTEGER,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "visibility" "Visibility" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Video_shotAt_idx" ON "Video"("shotAt");

-- CreateIndex
CREATE INDEX "Video_featured_idx" ON "Video"("featured");
