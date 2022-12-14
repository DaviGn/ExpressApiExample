import { Router } from 'express';

import userRoutes from './users.routes';
import citiesRoutes from './cities.routes';
import authRoutes from './auth.routes';
import { isAuthenticated } from '@middlewares/auth';

const routes = Router();

routes.use('/auth', authRoutes);

routes.use('/users', userRoutes);

// Require auth
routes.use(isAuthenticated);
routes.use('/cities', citiesRoutes);

export default routes;
