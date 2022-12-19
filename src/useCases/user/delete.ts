import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@repositories/user';
import { NotFoundException } from '@domain/exceptions/notFoundException';
import {
  IPresenter,
  NotFoundPresenter,
  DeletedPresenter,
} from '@presenters/index';

@injectable()
export class DeleteUserUseCase {
  constructor(@inject('UserRepository') private repository: IUserRepository) {}

  async handle(id: string): Promise<IPresenter> {
    const userExist = await this.checkIfUserExists(id);

    if (!userExist) {
      return new NotFoundPresenter({ message: 'User not found!' });
    }

    await this.repository.delete(id);
    return new DeletedPresenter();
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
