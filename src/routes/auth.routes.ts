import { Router } from 'express';
import { validationsMiddleware } from '@middlewares/validations';
import { authenticate } from '@controllers/auth';
import { authValidations } from '@validators/auth';

const authRoutes = Router();

authRoutes.post('/', authValidations, validationsMiddleware, authenticate);

export default authRoutes;
