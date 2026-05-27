-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "faqs" JSONB,
ADD COLUMN     "shortName" TEXT,
ALTER COLUMN "published" SET DEFAULT true;
