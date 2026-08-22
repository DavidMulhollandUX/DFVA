-- CreateEnum
CREATE TYPE "T1FileType" AS ENUM ('T1XL', 'T1ETLP', 'T1DM', 'T1DB');

-- AlterTable
ALTER TABLE "AssessmentJob" ADD COLUMN     "t1ProgramSnapshotId" TEXT;

-- CreateTable
CREATE TABLE "T1ImportJob" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "institutionId" TEXT NOT NULL,
    "fileHash" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" "T1FileType" NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'queued',
    "rowCount" INTEGER NOT NULL DEFAULT 0,
    "entityCount" INTEGER NOT NULL DEFAULT 0,
    "entityTypes" TEXT[],
    "errorMessage" TEXT,

    CONSTRAINT "T1ImportJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "T1ProgramSnapshot" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "importJobId" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "programCode" TEXT NOT NULL,
    "programName" TEXT NOT NULL,
    "level" TEXT,
    "handbookUrl" TEXT,
    "enrolmentCount" INTEGER,
    "applications" INTEGER,
    "offers" INTEGER,
    "acceptances" INTEGER,
    "retentionRate" DOUBLE PRECISION,
    "progressionRate" DOUBLE PRECISION,
    "courseList" JSONB,
    "sourceFileType" "T1FileType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "T1ProgramSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "T1EnrolmentTrend" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "importJobId" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "programCode" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "applications" INTEGER NOT NULL DEFAULT 0,
    "offers" INTEGER NOT NULL DEFAULT 0,
    "acceptances" INTEGER NOT NULL DEFAULT 0,
    "enrolments" INTEGER NOT NULL DEFAULT 0,
    "withdrawalCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "T1EnrolmentTrend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "T1ImportJob_institutionId_createdAt_idx" ON "T1ImportJob"("institutionId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "T1ImportJob_fileHash_key" ON "T1ImportJob"("fileHash");

-- CreateIndex
CREATE INDEX "T1ProgramSnapshot_institutionId_programCode_idx" ON "T1ProgramSnapshot"("institutionId", "programCode");

-- CreateIndex
CREATE INDEX "T1ProgramSnapshot_importJobId_idx" ON "T1ProgramSnapshot"("importJobId");

-- CreateIndex
CREATE INDEX "T1EnrolmentTrend_programCode_year_idx" ON "T1EnrolmentTrend"("programCode", "year");

-- CreateIndex
CREATE UNIQUE INDEX "T1EnrolmentTrend_institutionId_programCode_year_semester_key" ON "T1EnrolmentTrend"("institutionId", "programCode", "year", "semester");

-- AddForeignKey
ALTER TABLE "AssessmentJob" ADD CONSTRAINT "AssessmentJob_t1ProgramSnapshotId_fkey" FOREIGN KEY ("t1ProgramSnapshotId") REFERENCES "T1ProgramSnapshot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "T1ImportJob" ADD CONSTRAINT "T1ImportJob_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "T1ProgramSnapshot" ADD CONSTRAINT "T1ProgramSnapshot_importJobId_fkey" FOREIGN KEY ("importJobId") REFERENCES "T1ImportJob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "T1ProgramSnapshot" ADD CONSTRAINT "T1ProgramSnapshot_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "T1EnrolmentTrend" ADD CONSTRAINT "T1EnrolmentTrend_importJobId_fkey" FOREIGN KEY ("importJobId") REFERENCES "T1ImportJob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "T1EnrolmentTrend" ADD CONSTRAINT "T1EnrolmentTrend_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

