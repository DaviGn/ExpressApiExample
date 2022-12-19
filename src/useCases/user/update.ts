import { inject, injectable } from 'tsyringe';

import { UpdateUserRequest } from '@request/user';
import { IUserRepository } from '@repositories/user';
import {
  IPresenter,
  NotFoundPresenter,
  SuccessPresenter,
} from '@presenters/index';
import { toUserResponse } from '@maps/user';

@injectable()
export class UpdateUserUseCase {
  constructor(@inject('UserRepository') private repository: IUserRepository) {}

  async handle(user: UpdateUserRequest & { id: string }): Promise<IPresenter> {
    const userExist = await this.checkIfUserExists(user.id);

    if (!userExist) {
      return new NotFoundPresenter({ message: 'User not found!' });
    }

    const updatedUser = await this.repository.update(user);
    const result = toUserResponse(updatedUser);
    return new SuccessPresenter(result);
  }

  private async checkIfUserExists(id: string): Promise<boolean> {
    const existingUser = await this.repository.findById(id);
    const userExist = !!existingUser;
    return userExist;

    // If want to validate through exception
    // if (!userExist) {
    //   throw new NotFoundException('User not found!');
    // }
  }
}
