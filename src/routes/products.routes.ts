import { Router } from 'express';
import { getProduct, listProducts } from '@controllers/product';

const productsRoutes = Router();

productsRoutes.get('/', listProducts);
productsRoutes.get('/:id', getProduct);

export default productsRoutes;
