import { Router } from 'express';
import { validationsMiddleware } from '@middlewares/validations';
import {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@controllers/category';

import {
  categoryIdValidation,
  createCategoryValidations,
  updateCategoryValidations,
} from '@validators/category';

const categoriesRoutes = Router();

categoriesRoutes.get('/', listCategories);
categoriesRoutes.get('/:id', getCategory);
categoriesRoutes.post(
  '/',
  createCategoryValidations,
  validationsMiddleware,
  createCategory
);
categoriesRoutes.put(
  '/:id',
  updateCategoryValidations,
  validationsMiddleware,
  updateCategory
);
categoriesRoutes.delete(
  '/:id',
  categoryIdValidation,
  validationsMiddleware,
  deleteCategory
);

export default categoriesRoutes;
