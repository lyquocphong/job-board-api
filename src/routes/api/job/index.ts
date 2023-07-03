import {
  Router,
  Request,
  Response,
  RequestHandler
} from "express";
import Joi from "joi";
import {
  createJob,
  generateAIJobDescription,
  getAllJobs,
  getJobById,
  deleteJob,
  updateJob
} from "@/services/job";
import {
  CreateJobRequest,
  GenerateRouteOption,
  Job
} from "@/types";
import generateRoute from "@/utils/routes";

const router: Router = Router();

const mainPath = "/jobs";

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         location:
 *           type: string
 *         duration:
 *           type: string
 *         startDate:
 *           type: string
 *         requirements:
 *           type: string
 *         companyDetails:
 *           type: string
 *         contactDetails:
 *           type: string
 *         publishEndDate:
 *           type: string
 *         duty:
 *           type: string
 *
 *     CreateJobRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         location:
 *           type: string
 *         duration:
 *           type: string
 *         startDate:
 *           type: string
 *         requirements:
 *           type: string
 *         companyDetails:
 *           type: string
 *         contactDetails:
 *           type: string
 *         publishEndDate:
 *           type: string
 *         duty:
 *           type: string
 *
 *     UpdateJobRequest:
 *       allOf:
 *         - $ref: '#/components/schemas/CreateJobRequest'
 *         - type: object
 *       required:
 *         - title
 *         - location
 *         - duration
 *         - startDate
 *         - requirements
 *         - companyDetails
 *         - contactDetails
 *         - publishEndDate
 *         - duty
 */

/**
 * @swagger
 * /jobs/{jobId}/aidescription/{lang}:
 *   get:
 *     summary: Generate job description
 *     parameters:
 *       - in: path
 *         name: jobId
 *         schema:
 *           type: string
 *           required: true
 *         description: ID of the job
 *       - in: path
 *         name: lang
 *         schema:
 *           type: string
 *           required: true
 *         description: Language of the job description
 *     responses:
 *       '200':
 *         description: Job description generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: 'This is the generated job description in the specified language.'
 *       '404':
 *         description: Job not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: false
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: false
 */
const generateJobDescription: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { jobId, lang } = req.params;

  const job = await getJobById(jobId);

  if (!job) {
    res.status(500)
    res.json({ result: false });
    return;
  }

  const description = await generateAIJobDescription(job, lang);
  res.json({ data: description });
};

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all jobs
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *       '500':
 *         description: Internal server error
 */
const getAllJobHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const jobs = await getAllJobs();

  res.json({ data: jobs });
};

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new job
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateJobRequest'
 *     responses:
 *       '200':
 *         description: New job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: false
 */
const createJobHandler: RequestHandler<{}, {}, CreateJobRequest> = async (
  req,
  res
) => {
  const {
    title,
    location,
    duration,
    startDate,
    requirements,
    companyDetails,
    contactDetails,
    publishEndDate,
  } = req.body;

  const newJob: Job = await createJob(req.body);

  res.json({ data: newJob });
};

/**
 * @swagger
 * /jobs/{jobId}:
 *   delete:
 *     summary: Delete a job
 *     parameters:
 *       - in: path
 *         name: jobId
 *         schema:
 *           type: string
 *           required: true
 *         description: ID of the job to delete
 *     responses:
 *       '200':
 *         description: Job deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *       '404':
 *         description: Job not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: false
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: false
 */
const deleteJobHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { jobId } = req.params;

  const job = await getJobById(jobId);

  if (!job) {
    res.status(500)
    res.json({ result: false });
    return;
  }

  await deleteJob(jobId);
  res.json({ result: true });
};

/**
 * @swagger
 * /jobs/{jobId}:
 *   get:
 *     summary: Retrieve a job by ID
 *     parameters:
 *       - name: jobId
 *         in: path
 *         description: ID of the job
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the job
 *         schema:
 *           $ref: '#/components/schemas/Job'
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: null
 */
const getJobByIdHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { jobId } = req.params;

  const job = await getJobById(jobId);

  if (!job) {
    res.status(500)
    res.json({ data: null });
    return;
  }
  res.json({ data: job });
};

/**
 * Update a job
 * 
 * @param {string} req.params.jobId - The ID of the job to update
 * @param {IJob} req.body - The updated job data
 * @returns {Promise<void>} - The update result
 * @swagger
 * /jobs/{jobId}:
 *   put:
 *     summary: Update a job
 *     parameters:
 *       - in: path
 *         name: jobId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the job to update
 *       - in: body
 *         name: jobData
 *         schema:
 *           $ref: '#/components/schemas/UpdateJobRequest'
 *         required: true
 *         description: The updated job data
 *     responses:
 *       '200':
 *         description: Successful update
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       '500':
 *         description: Error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: Indicates the update result
 *                   example: false  
 */
const updateJobHandler: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {

  const { jobId } = req.params;

  const job = await getJobById(jobId);

  if (!job) {
    res.status(500)
    res.json({ data: null });
    return;
  }

  const newData = req.body;

  await updateJob(jobId, newData);
  res.json({ data: newData });
};


const upsertJobSchema = Joi.object({
  title: Joi.string().required(),
  location: Joi.string().required(),
  duration: Joi.string().required(),
  startDate: Joi.string().required(),
  requirements: Joi.string().required(),
  companyDetails: Joi.string().required(),
  contactDetails: Joi.string().required(),
  publishEndDate: Joi.string().required(),
  duty: Joi.string().required(),
});

const routes: GenerateRouteOption[] = [
  {
    path: `${mainPath}`,
    method: "get",
    handler: getAllJobHandler,
  },
  {
    path: `${mainPath}`,
    method: "post",
    handler: createJobHandler,
    schema: upsertJobSchema,
  },
  {
    path: `${mainPath}/:jobId`,
    method: "put",
    handler: updateJobHandler,
    schema: upsertJobSchema,
  },
  {
    path: `${mainPath}/:jobId/aidescription/:lang`,
    method: "get",
    handler: generateJobDescription,
  },
  {
    path: `${mainPath}/:jobId`,
    method: "delete",
    handler: deleteJobHandler,
  },
  {
    path: `${mainPath}/:jobId`,
    method: "get",
    handler: getJobByIdHandler,
  },
];

generateRoute(routes, router);

export default router;
