/*
  Warnings:

  - You are about to drop the `Crystal` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('CRYSTAL', 'SPELL_KIT', 'AFFIRMATION', 'GIFT_SET', 'OTHER');

-- DropTable
DROP TABLE "Crystal";

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "ProductCategory" NOT NULL DEFAULT 'CRYSTAL',
    "imageUrl" TEXT,
    "benefit" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "badge" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "properties" TEXT[],
    "zodiac" TEXT[],
    "chakra" TEXT,
    "origin" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
