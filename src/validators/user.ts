import { IUserRepository, UserRepository } from '@repositories/user';
import { body, param } from 'express-validator';
import { container } from 'tsyringe';

export async function checkIfUserExistsByEmail(
    email: string,
    id?: string
): Promise<boolean> {
    const userRepository = container.resolve<IUserRepository>(UserRepository);
    const userByEmail = await userRepository.findByEmail(email);
    const userExists = !!userByEmail;

    if (id) {
        return userExists && userByEmail.id !== id;
    }

    return userExists;
}

const baseUserValidations = [
    body('name').notEmpty().withMessage('Name is required!'),
    body('cityId')
        .isInt({
            min: 0
        })
        .withMessage('City is required!')
];

// const baseEmailValidationChain = body('email')
//   .notEmpty()
//   .withMessage('E-mail is required')
//   .isEmail()
//   .withMessage('E-mail is invalid!')
//   .bail();

export const userIdValidation = [
    param('id').notEmpty().withMessage('Id is required!')
];

export const createUserValidations = [
    ...baseUserValidations,
    body('password').notEmpty().withMessage('Password is required'),
    body('email')
        .notEmpty()
        .withMessage('E-mail is required')
        .isEmail()
        .withMessage('E-mail is invalid!')
        .bail()
        .custom(
            (value) =>
                new Promise((resolve, reject) => {
                    checkIfUserExistsByEmail(value).then((result) => {
                        if (result) {
                            reject('E-mail is already in use!');
                        } else {
                            resolve(value);
                        }
                    });
                })
        )
];

export const updateUserValidations = [
    ...userIdValidation,
    ...baseUserValidations,
    body('email')
        .notEmpty()
        .withMessage('E-mail is required')
        .isEmail()
        .withMessage('E-mail is invalid!')
        .bail()
        .custom(
            (value, { req }) =>
                new Promise((resolve, reject) => {
                    checkIfUserExistsByEmail(value, req.params?.id).then(
                        (result) => {
                            if (result) {
                                reject('E-mail is already in use!');
                            } else {
                                resolve(value);
                            }
                        }
                    );
                })
        )
];
