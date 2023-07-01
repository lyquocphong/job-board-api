import UserRoute from '@/routes/api/user';
import JobRoute from '@/routes/api/job';
import { Router } from 'express';

export const apiRoutes: Router[] = [
    UserRoute,
    JobRoute
]
