import { inject, injectable } from 'tsyringe';

import { UserDto } from '@domain/dtos/user';
import { IUserRepository } from '@repositories/user';
import { IPresenter, NotFoundPresenter } from '@presenters';
import { SuccessPresenter } from '../../presenters/success';

@injectable()
export class UpdateUserUseCase {
  constructor(@inject('UserRepository') private repository: IUserRepository) {}

  async handle(user: UserDto): Promise<IPresenter> {
    const userExist = await this.checkIfUserExists(user.id);

    if (!userExist) {
      return new NotFoundPresenter({ message: 'User not found!' });
    }

    const updatedUser = await this.repository.update(user);
    return new SuccessPresenter(updatedUser);
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
