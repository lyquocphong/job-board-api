import request from 'supertest';
import app from "@/app";
import prisma from "@/prisma";


describe('Job routes', () => {

    afterEach(async () => {
        // Reset the database or perform any cleanup after each test
        await prisma.job.deleteMany();
    });

    it('should get all jobs', async () => {
        const response = await request(app).get('/api/jobs');
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(Array.isArray(response.body.data)).toBe(true);
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
            duty: "Contribute to in-house e-commerce system. Work with aws cloud"
        };

        let response = await request(app).post('/api/jobs').send(newJob);
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(response.body.data.id).toBeDefined();

        response = await request(app).get('/api/jobs');
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(1);
    });
});