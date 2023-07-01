import { Router, Request, Response, RequestHandler, NextFunction } from 'express';
import { generateAIJobDescription, getAllJobs, getJobById } from '@/services/job'
import { GenerateRouteOption, Job, JobWithoutId } from '@/types'
import generateRoute from '@/utils/routes'

const router: Router = Router();

const mainPath = '/jobs';

const generateJobDescription: RequestHandler = async (req: Request, res: Response) => {

  const { jobId, lang} = req.params;
  
  const job = await getJobById(jobId);

  if (!job) {
    throw new Error ('Do not found')
  }

  const description = await generateAIJobDescription(job as Job, lang);
  res.end(description);
};

const getAllJobHandler: RequestHandler = async (req: Request, res: Response) => {

  const jobs = await getAllJobs();

  res.json({ data: jobs });
}

const routes: GenerateRouteOption[] = [
  {
    path: `${mainPath}`,
    method: 'get',
    handler: getAllJobHandler
  },
  {
    path: `${mainPath}/:jobId/aidescription/:lang`,
    method: 'get',
    handler: generateJobDescription
  }
]

generateRoute(routes, router);

// router.get('/jobs', (req: Request, res: Response) => {
//   // Handle user retrieval logic here
//   res.json({ message: 'Get jobs' });
// });

// app.get('/jobs', async (req: Request, res: Response): Promise<void> => {
//   try {
//     const jobs: Job[] = await prisma.job.findMany();
//     res.json(jobs);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching jobs' });
//   }
// });

// app.get('/jobs/:id', async (req: Request, res: Response): Promise<void> => {
//   const { id }: { id: string } = req.params;

//   try {
//     const job: Job | null = await prisma.job.findUnique({
//       where: { id: Number(id) },
//     });

//     if (!job) {
//       res.status(404).json({ error: 'Job not found' });
//       return;
//     }

//     res.json(job);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while fetching the job' });
//   }
// });

// app.post('/jobs', async (req: Request, res: Response): Promise<void> => {
//   const {
//     title,
//     location,
//     duration,
//     startDate,
//     description,
//     requirements,
//     companyDetails,
//     contactDetails,
//     publishEndDate,
//   }: Job = req.body;

//   try {
//     const job: Job = await prisma.job.create({
//       data: {
//         title,
//         location,
//         duration,
//         startDate,
//         description,
//         requirements,
//         companyDetails,
//         contactDetails,
//         publishEndDate,
//       },
//     });

//     res.json(job);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while creating the job' });
//   }
// });

// app.put('/jobs/:id', async (req: Request, res: Response): Promise<void> => {
//   const {
//     id,
//   }: { id: string } = req.params;

//   const {
//     title,
//     location,
//     duration,
//     startDate,
//     description,
//     requirements,
//     companyDetails,
//     contactDetails,
//     publishEndDate,
//   }: Job = req.body;

//   try {
//     const updatedJob: Job = await prisma.job.update({
//       where: { id: Number(id) },
//       data: {
//         title,
//         location,
//         duration,
//         startDate,
//         description,
//         requirements,
//         companyDetails,
//         contactDetails,
//         publishEndDate,
//       },
//     });

//     res.json(updatedJob);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while updating the job' });
//   }
// });

// app.delete('/jobs/:id', async (req: Request, res: Response): Promise<void> => {
//   const { id }: { id: string } = req.params;

//   try {
//     const deletedJob: Job | null = await prisma.job.delete({
//       where: { id: Number(id) },
//     });

//     res.json(deletedJob);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while deleting the job' });
//   }
// });

export default router;