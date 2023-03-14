import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { IPresenter, CreatedPresenter } from '@presenters/index';
import { IStorageService } from '@services/istorage';

@injectable()
export class SaveUserPhotoUseCase {
    constructor(@inject('StorageService') private s3Service: IStorageService) {}

    async handle(
        userId: string,
        fileExtension: string,
        filePath: string
    ): Promise<IPresenter> {
        const file = fs.readFileSync(filePath);
        const imageUrl = await this.s3Service.uploadFile(
            `${userId}${fileExtension}`,
            file
        );
        return new CreatedPresenter({ imageUrl });
    }
}
