import { body } from 'express-validator';

export const createPurchaseValidations = [
  body('items.*.productId').notEmpty().withMessage('ProductId is required!'),
  body('items.*.qtd')
    .notEmpty()
    .withMessage('Quantity is required!')
    .bail()
    .isInt({
      min: 0,
    })
    .withMessage('Quantity must not be zero!'),
];
