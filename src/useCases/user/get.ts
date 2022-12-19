import { inject, injectable } from 'tsyringe';

import { toUserCityResponse } from '@maps/user';
import { IUserRepository } from '@repositories/user';
import {
  IPresenter,
  NotFoundPresenter,
  SuccessPresenter,
} from '@presenters/index';

@injectable()
export class GetUserUseCase {
  constructor(@inject('UserRepository') private repository: IUserRepository) {}

  async handle(id: string): Promise<IPresenter> {
    const user = await this.repository.findById(id);

    if (!user) {
      return new NotFoundPresenter({ message: 'User not found!' });
    }

    const result = toUserCityResponse(user);
    return new SuccessPresenter(result);
  }
}
