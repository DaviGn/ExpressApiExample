import { Router } from 'express';
import { validationsMiddleware } from '@middlewares/validations';
import {
    listUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from '@controllers/user';

import {
    createUserValidations,
    updateUserValidations,
    userIdValidation
} from '@validators/user';
import { isAuthenticated } from '@middlewares/auth';

const userRoutes = Router();
userRoutes.post('/', createUserValidations, validationsMiddleware, createUser);

// Require auth
userRoutes.use(isAuthenticated);
userRoutes.get('/', listUsers);
userRoutes.get('/:id', getUser);
userRoutes.put(
    '/:id',
    updateUserValidations,
    validationsMiddleware,
    updateUser
);
userRoutes.delete('/:id', userIdValidation, validationsMiddleware, deleteUser);

export default userRoutes;
