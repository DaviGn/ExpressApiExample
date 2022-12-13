import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@repositories/user';
import { NotFoundException } from '@domain/exceptions/notFoundException';

@injectable()
export class DeleteUserUseCase {
  constructor(@inject('UserRepository') private repository: IUserRepository) {}

  async handle(id: string) {
    await this.validate(id);
    await this.repository.delete(id);
  }

  private async validate(id: string): Promise<void> {
    const existingUser = await this.repository.findById(id);
    const userExist = !!existingUser;

    if (!userExist) {
      throw new NotFoundException('User not found!');
    }
  }
}
