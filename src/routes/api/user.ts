import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/users", (req: Request, res: Response) => {
  // Handle user retrieval logic here
  res.json({ message: "Get users" });
});

export default router;
