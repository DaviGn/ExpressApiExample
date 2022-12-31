import {
    ListPurchaseItemsResponse,
    ListPurchaseResponse
} from '@responses/purchase';
import { PurchaseComplete, PurchaseItemComplete } from '@domain/types/purchase';
import { format } from 'date-fns';
import { toProductResponse } from './product';

function toPurchaseItemResponse(
    item: PurchaseItemComplete
): ListPurchaseItemsResponse {
    return {
        product: toProductResponse(item.product),
        qtd: item.qtd,
        unitValue: Number(item.unitValue),
        total: Number(item.unitValue) * item.qtd
    };
}

export function toPurchaseResponse(
    purchase: PurchaseComplete
): ListPurchaseResponse {
    return {
        id: purchase.id,
        date: format(purchase.date, 'dd/MM/yyyy HH:mm:ss'),
        totalValue: Number(purchase.totalValue),
        items: purchase.items.map(toPurchaseItemResponse)
    };
}
