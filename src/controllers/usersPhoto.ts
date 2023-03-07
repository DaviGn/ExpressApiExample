import { Request, Response } from 'express';

import { resolve } from '@di/handler';
import { processResult } from '@presenters/index';
import { SaveUserPhotoUseCase } from '@useCases/userPhoto/save';

export async function savePhoto(req: Request, res: Response) {
    if (!req.file) {
        return;
    }

    const useCase = resolve(SaveUserPhotoUseCase);
    const indexOfPoint = req.file.originalname.indexOf('.');
    const fileExtension = req.file.originalname.substring(indexOfPoint);
    const result = await useCase.handle(
        req.user.id,
        fileExtension,
        req.file.path
    );
    return processResult(res, result);
}
