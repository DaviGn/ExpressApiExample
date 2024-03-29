import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { ICacheService, RedisCacheService } from '@services/cache';
import { S3Service } from '@services/s3';
import { IStorageService } from '@services/istorage';

import './brand';
import './category';
import './city';
import './user';
import './product';
import './purchase';
import './purchaseItem';

container.register<PrismaClient>('PrismaClient', {
    useValue: new PrismaClient()
});
container.register<ICacheService>('CacheService', {
    useValue: new RedisCacheService()
});
container.register<IStorageService>('StorageService', {
    useValue: new S3Service()
});
