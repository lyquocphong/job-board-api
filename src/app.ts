import express, { Request, Response, Router, Express } from 'express';
import {apiRoutes} from '@/routes';
import config from '@/config'

const port = config.APP_PORT;

const app: Express = express();

app.use(express.json());

// Sample route for demonstration
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/api', apiRoutes)

export default app;