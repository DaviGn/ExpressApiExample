import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import { UserDto } from '@domain/dtos/user';
import { IUserRepository } from '@repositories/user';
import { IPresenter, SuccessPresenter } from '@presenters';

@injectable()
export class CreateUserUseCase {
  constructor(@inject('UserRepository') private repository: IUserRepository) {}

  async handle(user: Omit<UserDto, 'id'>): Promise<IPresenter> {
    const createdUser = await this.repository.create({
      id: v4(),
      name: user.name,
      email: user.email,
      cityId: user.cityId,
    });

    return new SuccessPresenter(createdUser);
  }
}
