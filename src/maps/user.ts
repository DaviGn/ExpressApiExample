import { User, City } from '@prisma/client';
import { UserResponse } from '../domain/response/user';
import { toCityResponse } from './city';

export function toUserCityResponse(user: User & { city: City }): UserResponse {
  return {
    ...toUserResponse(user),
    city: toCityResponse(user.city),
  };
}

export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
