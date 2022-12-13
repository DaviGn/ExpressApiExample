import { IUserRepository, UserRepository } from '@repositories/user';
import { body, param } from 'express-validator';
import { container } from 'tsyringe';

const baseUserValidations = [
  body('name').notEmpty().withMessage('Name is required!'),
  body('cityId')
    .isInt({
      min: 0,
    })
    .withMessage('City is required!'),
];

const baseEmailValidationChain = body('email')
  .notEmpty()
  .withMessage('E-mail is required')
  .bail()
  .isEmail()
  .withMessage('E-mail is invalid!')
  .bail();

export const userIdValidation = [
  param('id').notEmpty().withMessage('Id is required!'),
];

export const createUserValidations = [
  ...baseUserValidations,
  baseEmailValidationChain.custom((value) => {
    return new Promise((resolve, reject) => {
      validateIfUserExistsByEmail(value).then((result) => {
        if (result) reject('E-mail is already in use!');
        else resolve(value);
      });
    });
  }),
];

export const updateUserValidations = [
  ...userIdValidation,
  ...baseUserValidations,
  baseEmailValidationChain.custom((value, { req }) => {
    return new Promise((resolve, reject) => {
      validateIfUserExistsByEmail(value, req.params?.id).then((result) => {
        if (result) reject('E-mail is already in use!');
        else resolve(value);
      });
    });
  }),
];

async function validateIfUserExistsByEmail(
  email: string,
  id?: string
): Promise<boolean> {
  const userRepository = container.resolve<IUserRepository>(UserRepository);
  return await checkIfUserExistsByEmail(userRepository, email, id);
}

export async function checkIfUserExistsByEmail(
  repository: IUserRepository,
  email: string,
  id?: string
) {
  const userByEmail = await repository.findByEmail(email);
  const userExists = !!userByEmail;

  if (id) {
    return userExists && userByEmail.id !== id;
  }

  return userExists;
}
