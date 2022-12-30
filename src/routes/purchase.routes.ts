import { Router } from 'express';
import { createPurchase, listPurchases } from '@controllers/purchase';
import { createPurchaseValidations } from '@validators/purchase';
import { validationsMiddleware } from '@middlewares/validations';

const purchasesRoutes = Router();

purchasesRoutes.get('/', listPurchases);
purchasesRoutes.post(
  '/',
  createPurchaseValidations,
  validationsMiddleware,
  createPurchase
);

export default purchasesRoutes;
