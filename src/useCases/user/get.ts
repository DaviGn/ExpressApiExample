import { inject, injectable } from 'tsyringe';
import { User, City } from '@prisma/client';
import { toUserCityResponse } from '@maps/user';
import { IUserRepository } from '@repositories/user';
import {
  IPresenter,
  NotFoundPresenter,
  SuccessPresenter,
} from '@presenters/index';
import { ICacheService } from '@services/cache';

@injectable()
export class GetUserUseCase {
  constructor(
    @inject('UserRepository') private repository: IUserRepository,
    @inject('CacheService') private cacheService: ICacheService
  ) {}

  async handle(id: string): Promise<IPresenter> {
    const cachedUserKey = `user-${id}`;
    const cachedUser = await this.cacheService.get<User & { city: City }>(
      cachedUserKey
    );

    if (cachedUser) {
      console.log(`User ${id} is cached, returning it`);
      const result = toUserCityResponse(cachedUser);
      return new SuccessPresenter(result);
    }

    console.log(`Getting user ${id} from database`);
    const user = await this.repository.findById(id);

    if (!user) {
      return new NotFoundPresenter({ message: 'User not found!' });
    }

    const result = toUserCityResponse(user);
    await this.cacheService.set(cachedUserKey, result);
    return new SuccessPresenter(result);
  }
}
