import { Request, Response, NextFunction } from 'express';
import { ConflictException } from '../domain/exceptions/conflictException';
import { IException } from '@domain/exceptions/iException';

function isIException(obj: any): obj is IException {
  return 'statusCode' in obj && 'message' in obj;
}

export default function errorsMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  if (isIException(err)) {
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
