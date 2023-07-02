import request from 'supertest';
import app from "@/app";
import prisma from "@/prisma";

import {
    JobWithoutId
} from "@/types";

const createJob = async (jobData: JobWithoutId) => {
    const response = await request(app).post('/api/jobs').send(jobData);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.id).toBeDefined();
    return response.body.data;
};

const getAllJobsAndCheckAmount = async (expectedAmount: number) => {
    const response = await request(app).get('/api/jobs');
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(expectedAmount);
    return response.body.data;
};

const sampleJobData = {
    title: 'Software Engineer',
    location: 'San Francisco',
    duration: 'Full-time',
    startDate: '2023-01-01',
    requirements: 'Experience in JavaScript',
    companyDetails: 'ABC Company',
    contactDetails: 'email@example.com',
    publishEndDate: '2023-07-01',
    duty: 'Contribute to in-house e-commerce system. Work with AWS cloud',
};

describe('Job routes', () => {

    afterEach(async () => {
        // Reset the database or perform any cleanup after each test
        await prisma.job.deleteMany();
    });

    it('should get all jobs', async () => {
        getAllJobsAndCheckAmount(0);
    });

    it('should create a new job', async () => {
        const newJob = {
            title: 'Software Engineer',
            location: 'San Francisco',
            duration: 'Full-time',
            startDate: '2023-01-01',
            requirements: 'Experience in JavaScript',
            companyDetails: 'ABC Company',
            contactDetails: 'email@example.com',
            publishEndDate: '2023-07-01',
            duty: 'Contribute to in-house e-commerce system. Work with AWS cloud',
        };

        await createJob(sampleJobData);
        await getAllJobsAndCheckAmount(1);

    });

    it('should delete a job and return success response', async () => {

        const { id: jobId } = await createJob(sampleJobData);
        const jobs = await getAllJobsAndCheckAmount(1);

        const response = await request(app)
            .delete(`/api/jobs/${jobId}`)
            .expect(200);

            expect(response.body).toEqual({ result: true });

        await getAllJobsAndCheckAmount(0);
    });

    it('should return an error if job is not found', async () => {
        const jobId = '456';

        const response = await request(app)
            .delete(`/api/jobs/${jobId}`)
            .expect(500);

        expect(response.body).toEqual({ result: false });
    });
});