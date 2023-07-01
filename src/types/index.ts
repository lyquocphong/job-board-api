import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { Schema, ValidationError } from 'joi';

export type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export interface GenerateRouteOption {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
    isPrivate?: boolean;
    middlewares?: Middleware[];
    schema?: Schema;
    handler: RequestHandler;
}

export interface Job {
    id: string;
    title: string;
    location: string;
    duration: string;
    startDate: string;
    requirements: string;
    companyDetails: string;
    contactDetails: string;
    publishEndDate: string;
    duty: string;
}

export type JobWithoutId = Omit<Job, 'id'>;

// Exclude properties that are not needed for creating a new job
export type CreateJobRequest = JobWithoutId;

// Exclude properties that are not allowed to be updated
export type UpdateJobRequest = JobWithoutId;