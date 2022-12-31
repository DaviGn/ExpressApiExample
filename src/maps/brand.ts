import { Brand } from '@prisma/client';
import { BrandResponse } from '@responses/brand';

export function toBrandResponse(brand: Brand): BrandResponse {
    return {
        id: brand.id,
        name: brand.name
    };
}
