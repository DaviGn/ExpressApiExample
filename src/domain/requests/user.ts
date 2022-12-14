interface BaseUserRequest {
  name: string;
  email: string;
  cityId: number;
}

export interface CreateUserRequest extends BaseUserRequest {
  password: string;
}

export interface UpdateUserRequest extends BaseUserRequest {}
