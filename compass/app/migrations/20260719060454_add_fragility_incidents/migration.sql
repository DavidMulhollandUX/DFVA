-- CreateTable
CREATE TABLE "FragilityIncident" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "platform" TEXT NOT NULL,
    "statesAffected" JSONB NOT NULL,
    "blastRadius" INTEGER NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "sourceDescription" TEXT NOT NULL,
    "recoveryHours" INTEGER,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "FragilityIncident_pkey" PRIMARY KEY ("id")
);
