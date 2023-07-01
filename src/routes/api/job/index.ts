import { Router, Request, Response, RequestHandler, NextFunction } from 'express';
import { generateAIJobDescription } from '@/services/job'
import { GenerateRouteOption, JobWithoutId } from '@/types'
import generateRoute from '@/utils/routes'

const router: Router = Router();

const mainPath = '/jobs';

const generateJobDescription: RequestHandler = async (req: Request, res: Response) => {

  const title = 'Software Engineer';
  const location = 'San Francisco';
  const duration = 'Full-time';
  const startDate = 'September 1, 2023';
  const requirements = '3+ years of experience in software development';
  const companyDetails = 'XYZ Tech Inc. is a leading technology company specializing in software solutions.';
  const contactDetails = 'For more information, please contact us at jobs@xyztech.com';
  const publishEndDate = 'July 15, 2023';
  const duty = 'Take care of our in house product with C# and PHP'

  const job: JobWithoutId = {
    title,
    location,
    duration,
    startDate,
    requirements,
    companyDetails,
    contactDetails,
    publishEndDate,
    duty
  }

  const description = await generateAIJobDescription(job, 'english');
  res.end(description);
};

const routes: GenerateRouteOption[] = [
  {
    path: `${mainPath}/description`,
    method: 'get',
    handler: generateJobDescription
  }
]

generateRoute(routes, router);

router.get('/jobs', (req: Request, res: Response) => {
  // Handle user retrieval logic here
  res.json({ message: 'Get jobs' });
});

export default router;