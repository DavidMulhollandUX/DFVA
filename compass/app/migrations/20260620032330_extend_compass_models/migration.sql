/*
  Warnings:

  - You are about to drop the `Auth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuthIdentity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_userId_fkey";

-- DropForeignKey
ALTER TABLE "AuthIdentity" DROP CONSTRAINT "AuthIdentity_authId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "AssessmentJob" ADD COLUMN     "syllabusJson" JSONB;

-- DropTable
DROP TABLE "Auth";

-- DropTable
DROP TABLE "AuthIdentity";

-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "MarketValidationSignal" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "dateDiscovered" TIMESTAMP(3) NOT NULL,
    "credibilityScore" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "relevantClaim" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketValidationSignal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitiveEvent" (
    "id" TEXT NOT NULL,
    "competitor" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "url" TEXT,
    "dateOccurred" TIMESTAMP(3) NOT NULL,
    "dateDiscovered" TIMESTAMP(3) NOT NULL,
    "impactScore" INTEGER NOT NULL,
    "marketWindowEffect" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompetitiveEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketWindowSnapshot" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "urgencyText" TEXT NOT NULL,
    "keyThreats" JSONB NOT NULL,
    "recommendedActions" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MarketWindowSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlumniDestination" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "programCode" TEXT NOT NULL,
    "graduationYear" INTEGER NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "employer" TEXT,
    "industryCluster" TEXT NOT NULL,

    CONSTRAINT "AlumniDestination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseInterventionOwner" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assessmentJobId" TEXT NOT NULL,
    "courseCode" TEXT NOT NULL,
    "dimensionId" INTEGER NOT NULL,
    "ownerName" TEXT NOT NULL,
    "ownerEmail" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'assigned',
    "targetDate" TIMESTAMP(3),

    CONSTRAINT "CourseInterventionOwner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AlumniDestination_programCode_idx" ON "AlumniDestination"("programCode");

-- CreateIndex
CREATE INDEX "AlumniDestination_industryCluster_idx" ON "AlumniDestination"("industryCluster");

-- CreateIndex
CREATE UNIQUE INDEX "CourseInterventionOwner_assessmentJobId_courseCode_dimensio_key" ON "CourseInterventionOwner"("assessmentJobId", "courseCode", "dimensionId");

-- AddForeignKey
ALTER TABLE "AlumniDestination" ADD CONSTRAINT "AlumniDestination_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
