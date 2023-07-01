import { Router, Request, Response, NextFunction } from 'express';
import { Schema, ValidationError } from 'joi';
import { GenerateRouteOption } from '@/types'

export function generateRoute(routes: GenerateRouteOption[], router: Router): Router {

    router = router || Router();

    // Helper function to handle validation errors
    function handleValidationError(err: ValidationError, res: Response): void {
        const errors = err.details.map((detail) => detail.message);
        throw new Error(`Validation Error: ${errors.join(', ')}`);
    }

    function validateRequest(schema: Schema, req: Request, res: Response, next: NextFunction): void {
        const { error } = schema.validate(req.body);
        if (error) {
            handleValidationError(error, res);
        } else {
            next();
        }
    }

    function createRoute(route: GenerateRouteOption): void {
        const { path, method, handler, isPrivate = false, middlewares = [], schema } = route;

        const routeMiddlewares = [...middlewares];

        if (schema) {
            routeMiddlewares.push((req: Request, res: Response, next: NextFunction) =>
                validateRequest(schema, req, res, next)
            );
        }

        const routeHandler = (req: Request, res: Response, next: NextFunction) => {
            try {
                handler(req, res, next);
            } catch (error) {
                next(error);
            }
        };

        (router as any)[method.toLowerCase()](path, routeMiddlewares, routeHandler);
    }

    routes.forEach((route) => {
        createRoute(route);
    });

    return router;
}

export default generateRoute;