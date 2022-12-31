import { body } from 'express-validator';

export const authValidations = [
    body('email')
        .notEmpty()
        .withMessage('E-mail is required')
        .isEmail()
        .withMessage('E-mail is invalid!')
        .bail(),
    body('password').notEmpty().withMessage('Password is required')
];
