-- CreateTable
CREATE TABLE "job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "companyDetails" TEXT NOT NULL,
    "contactDetails" TEXT NOT NULL,
    "publishEndDate" TEXT NOT NULL,

    CONSTRAINT "job_pkey" PRIMARY KEY ("id")
);
