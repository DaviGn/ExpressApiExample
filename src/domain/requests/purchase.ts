export interface PurchaseItemRequest {
    productId: string;
    qtd: number;
}

export interface PurchaseRequest {
    userId: string;
    items: PurchaseItemRequest[];
}
