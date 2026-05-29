-- AlterTable
ALTER TABLE "User" ADD COLUMN     "failed_attempt_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "last_login" TIMESTAMP(3),
ADD COLUMN     "refresh_token" TEXT;
