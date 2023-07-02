import prisma from "@/prisma";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "@/services/job";

describe("Job Service", () => {
  beforeAll(async () => {
    // Add any necessary setup here
  });

  afterAll(async () => {
    // Add any necessary teardown here
    await prisma.$disconnect();
  });

  afterEach(async () => {
    // Reset the database or perform any cleanup after each test
    await prisma.job.deleteMany();
  });

  it("should create a new job", async () => {
    const jobData = {
      title: "Job Title",
      location: "Job Location",
      duration: "Job Duration",
      startDate: "Job Start Date",
      requirements: "Job Requirements",
      companyDetails: "Job Company Details",
      contactDetails: "Job Contact Details",
      publishEndDate: "Job Publish End Date",
      duty: "Job Duty",
    };

    const createdJob = await createJob(jobData);

    expect(createdJob).toMatchObject(jobData);
  });

  it("should retrieve all jobs", async () => {
    const jobs = await getAllJobs();

    expect(Array.isArray(jobs)).toBe(true);
    expect(jobs.length).toBe(0); // Assuming no jobs have been created
  });

    // it('should retrieve a job by ID', async () => {
    //   const jobData = {
    //     title: 'Job Title',
    //     location: 'Job Location',
    //     duration: 'Job Duration',
    //     startDate: 'Job Start Date',
    //     requirements: 'Job Requirements',
    //     companyDetails: 'Job Company Details',
    //     contactDetails: 'Job Contact Details',
    //     publishEndDate: 'Job Publish End Date',
    //     duty: 'Job Duty',
    //   };

    //   const createdJob = await createJob(jobData);
    //   const retrievedJob = await getJobById(createdJob.id);

    //   expect(retrievedJob).toMatchObject(createdJob);
    // });

    // it('should update a job', async () => {
    //   const jobData = {
    //     title: 'Job Title',
    //     location: 'Job Location',
    //     duration: 'Job Duration',
    //     startDate: 'Job Start Date',
    //     requirements: 'Job Requirements',
    //     companyDetails: 'Job Company Details',
    //     contactDetails: 'Job Contact Details',
    //     publishEndDate: 'Job Publish End Date',
    //     duty: 'Job Duty',
    //   };

    //   const createdJob = await createJob(jobData);
    //   const updatedJobData = {
    //     ...jobData,
    //     title: 'Updated Job Title',
    //     location: 'Updated Job Location',
    //   };

    //   const updatedJob = await updateJob(createdJob.id, updatedJobData);

    //   expect(updatedJob).toMatchObject(updatedJobData);
    // });

    it('should delete a job', async () => {
      const jobData = {
        title: 'Job Title',
        location: 'Job Location',
        duration: 'Job Duration',
        startDate: 'Job Start Date',
        requirements: 'Job Requirements',
        companyDetails: 'Job Company Details',
        contactDetails: 'Job Contact Details',
        publishEndDate: 'Job Publish End Date',
        duty: 'Job Duty',
      };

      const createdJob = await createJob(jobData);

      await deleteJob(createdJob.id);

      const retrievedJob = await getJobById(createdJob.id);

      expect(retrievedJob).toBeNull();
    });
});
