import { body, param } from 'express-validator';

export const brandIdValidation = [
  param('id')
    .notEmpty()
    .withMessage('Id is required!')
    .isInt({
      min: 0,
    })
    .withMessage('Id is required!'),
];

export const createBrandValidations = [
  body('name').notEmpty().withMessage('Name is required!'),
];

export const updateBrandValidations = [
  ...brandIdValidation,
  ...createBrandValidations,
];
