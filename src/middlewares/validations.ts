import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export async function validationsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.array());
    return;
  }

  await next();
}
