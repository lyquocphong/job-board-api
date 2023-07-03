import { Job } from "@/types";

const fs = require('fs');
const path = require('path');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Define the path to the JSON file
const filePath = path.join(__dirname, 'jobs.json');

// Read the JSON file
const jobsData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

async function seed() {
    try {
        // Seed jobs
        const jobs = await prisma.job.createMany({
            data: jobsData.map((job: Job) => ({
                id: job.id,
                title: job.title,
                location: job.location,
                duration: job.duration,
                startDate: job.startDate,
                requirements: job.requirements,
                companyDetails: job.companyDetails,
                contactDetails: job.contactDetails,
                publishEndDate: job.publishEndDate,
                duty: job.duty,
            })),
            skipDuplicates: true, // Skip duplicate entries
        });

        console.log(`Seeded ${jobs.length} jobs`);
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();