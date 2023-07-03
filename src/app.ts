import express, { Request, Response, Router, Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "@/swagger";
import { apiRoutes } from "@/routes";
import config from "@/config";
import cors from "cors";
import bodyParser from "body-parser";

const port = config.APP_PORT;

const app: Express = express();

app.use(cors())

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

// Sample route for demonstration
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/api", apiRoutes);

// Serve Swagger API documentation
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
