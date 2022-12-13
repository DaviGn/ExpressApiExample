import { inject, injectable } from 'tsyringe';
import { User } from '@prisma/client';

import { UserDto } from '@domain/dtos/user';
import { IUserRepository } from '@repositories/user';
import { NotFoundException } from '@domain/exceptions/notFoundException';

@injectable()
export class UpdateUserUseCase {
  constructor(@inject('UserRepository') private repository: IUserRepository) {}

  async handle(user: UserDto): Promise<User> {
    await this.validate(user);

    const updatedUser = await this.repository.update(user);
    return updatedUser;
  }

  private async validate(user: UserDto): Promise<void> {
    const existingUser = await this.repository.findById(user.id);
    const userExist = !!existingUser;

    if (!userExist) {
      throw new NotFoundException('User not found!');
    }
  }
}
