import { Router } from 'express';

import userRoutes from './users.routes';
import userPhotoRoutes from './usersPhoto.routes';
import citiesRoutes from './cities.routes';
import authRoutes from './auth.routes';
import brandRoutes from './brands.routes';
import categoryRoutes from './categories.routes';
import productsRoutes from './products.routes';
import purchasesRoutes from './purchase.routes';

import { isAuthenticated } from '@middlewares/auth';

const routes = Router();

routes.get('/', (_, res) =>
    res.json({
        message: 'Hello World!',
        status: 'Healthy'
    })
);

routes.use('/auth', authRoutes);
routes.use('/cities', citiesRoutes);
routes.use('/brands', brandRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/products', productsRoutes);

routes.use('/users', userRoutes);

// Routes that require auth
routes.use(isAuthenticated);
routes.use('/purchases', purchasesRoutes);
routes.use('/usersPhoto', userPhotoRoutes);

export default routes;
