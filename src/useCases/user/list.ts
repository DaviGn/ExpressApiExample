import { inject, injectable } from 'tsyringe';

import { toUserCityResponse } from '@maps/user';
import { IUserRepository } from '@repositories/user';
import { IPresenter, SuccessPresenter } from '@presenters/index';

@injectable()
export class ListUsersUseCase {
  constructor(@inject('UserRepository') private repository: IUserRepository) {}

  async handle(): Promise<IPresenter> {
    const users = await this.repository.list();
    const usersResponse = users.map((user) => toUserCityResponse(user));
    return new SuccessPresenter(usersResponse);
  }
}
