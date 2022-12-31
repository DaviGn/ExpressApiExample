import { Router } from 'express';
import { validationsMiddleware } from '@middlewares/validations';
import {
    listBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand
} from '@controllers/brand';

import {
    brandIdValidation,
    createBrandValidations,
    updateBrandValidations
} from '@validators/brand';

const brandsRoutes = Router();

brandsRoutes.get('/', listBrands);
brandsRoutes.get('/:id', getBrand);
brandsRoutes.post(
    '/',
    createBrandValidations,
    validationsMiddleware,
    createBrand
);
brandsRoutes.put(
    '/:id',
    updateBrandValidations,
    validationsMiddleware,
    updateBrand
);
brandsRoutes.delete(
    '/:id',
    brandIdValidation,
    validationsMiddleware,
    deleteBrand
);

export default brandsRoutes;
