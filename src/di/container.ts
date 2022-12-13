import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';

container.register<PrismaClient>('PrismaClient', {
  useValue: new PrismaClient(),
});

import './city';
import './user';
