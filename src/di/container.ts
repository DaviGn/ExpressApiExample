import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { ICacheService, RedisCacheService } from '@services/cache';

container.register<PrismaClient>('PrismaClient', {
  useValue: new PrismaClient(),
});
container.register<ICacheService>('CacheService', {
  useValue: new RedisCacheService(),
});

import './city';
import './user';
