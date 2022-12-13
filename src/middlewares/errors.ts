import { Request, Response, NextFunction } from 'express';
import { NotFoundException } from '../domain/exceptions/notFoundException';
import { ConflictException } from '../domain/exceptions/conflictException';

export default function errorsMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  if (err instanceof NotFoundException) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (err instanceof ConflictException) {
    return res.status(err.statusCode).json({
      message: err.message,
      field: err.field,
    });
  }

  return res.status(500).json({
    message: 'Ops! Ocorreu um erro',
  });
}
