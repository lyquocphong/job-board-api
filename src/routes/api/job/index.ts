import { Router, Request, Response } from 'express';
import {generateJobDescription} from '@/services/job'

const router:Router = Router();

router.get('/jobs', (req: Request, res: Response) => {
  // Handle user retrieval logic here
  res.json({ message: 'Get jobs' });
});

router.get('/jobs/generate/description', async (req: Request, res: Response) => {
    
    const description = await generateJobDescription();
    
    // Handle user retrieval logic here
    res.end(description);
  });

export default router;