import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { IPresenter, CreatedPresenter } from '@presenters/index';
import { IS3Service } from '@services/s3';

@injectable()
export class SaveUserPhotoUseCase {
    constructor(@inject('S3Service') private s3Service: IS3Service) {}

    async handle(
        userId: string,
        fileExtension: string,
        filePath: string
    ): Promise<IPresenter> {
        const file = await fs.readFileSync(filePath);
        const imageUrl = await this.s3Service.uploadFile(
            `${userId}${fileExtension}`,
            file
        );
        return new CreatedPresenter({ imageUrl });
    }
}
