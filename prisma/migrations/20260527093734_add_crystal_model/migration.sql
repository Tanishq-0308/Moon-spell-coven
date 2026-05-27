-- CreateTable
CREATE TABLE "Crystal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "benefit" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "badge" TEXT,
    "properties" TEXT[],
    "zodiac" TEXT[],
    "chakra" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Crystal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Crystal_slug_key" ON "Crystal"("slug");
