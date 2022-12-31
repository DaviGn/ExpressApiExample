import { container } from 'tsyringe';

import {
    IPurchaseItemRepository,
    PurchaseItemRepository
} from '@repositories/purchaseItem';

// Repositories
container.register<IPurchaseItemRepository>(
    'PurchaseItemRepository',
    PurchaseItemRepository
);
