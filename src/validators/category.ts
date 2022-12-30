import { body, param } from 'express-validator';

export const categoryIdValidation = [
  param('id')
    .notEmpty()
    .withMessage('Id is required!')
    .isInt({
      min: 0,
    })
    .withMessage('Id is required!'),
];

export const createCategoryValidations = [
  body('name').notEmpty().withMessage('Name is required!'),
];

export const updateCategoryValidations = [
  ...categoryIdValidation,
  ...createCategoryValidations,
];
