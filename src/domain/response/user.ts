import { CityResponse } from './city';

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  city?: CityResponse;
}
