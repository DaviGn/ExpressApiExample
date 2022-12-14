import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { CreateUserRequest } from '@request/user';
import { IUserRepository } from '@repositories/user';
import { IPresenter, SuccessPresenter } from '@presenters';
import { crypt } from '@services/crypt';
import { toUserResponse } from '@maps/user';

@injectable()
export class CreateUserUseCase {
  constructor(@inject('UserRepository') private repository: IUserRepository) {}

  async handle({
    name,
    email,
    password,
    cityId,
  }: CreateUserRequest): Promise<IPresenter> {
    const hashedPasswordData = crypt(password);

    const createdUser = await this.repository.create({
      id: v4(),
      name,
      email,
      password: hashedPasswordData.hash,
      salt: hashedPasswordData.salt,
      cityId,
    });

    const result = toUserResponse(createdUser);
    return new SuccessPresenter(result);
  }
}
