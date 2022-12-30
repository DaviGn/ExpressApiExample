import { Purchase, PurchaseItem } from '@prisma/client';
import { ProductComplete } from './product';

export type PurchaseItemComplete = PurchaseItem & { product: ProductComplete };
export type PurchaseComplete = Purchase & { items: PurchaseItemComplete[] };
