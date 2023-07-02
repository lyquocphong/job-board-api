import { Router } from "express";
import UserRoute from "@/routes/api/user";
import JobRoute from "@/routes/api/job";

export const apiRoutes: Router[] = [UserRoute, JobRoute];
