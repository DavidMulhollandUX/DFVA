/*
  Warnings:

  - A unique constraint covering the columns `[userId,programCode,graduationYear,jobTitle]` on the table `AlumniDestination` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "AssessmentJob" ADD COLUMN     "assessmentSlug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "AlumniDestination_userId_programCode_graduationYear_jobTitl_key" ON "AlumniDestination"("userId", "programCode", "graduationYear", "jobTitle");

-- CreateIndex
CREATE INDEX "AssessmentJob_userId_createdAt_idx" ON "AssessmentJob"("userId", "createdAt");
