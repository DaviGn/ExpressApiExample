import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { IUserRepository } from '@repositories/user';
import {
  IPresenter,
  SuccessPresenter,
  UnathorizedPresenter,
  ErrorPresenter,
} from '@presenters/index';
import { AuthRequest } from '@requests/auth';
import { hash } from '@services/crypt';
import { JwtSignKey } from 'configs/jwt';

@injectable()
export class AuthenticateUserUseCase {
  constructor(@inject('UserRepository') private repository: IUserRepository) {}

  async handle({ email, password }: AuthRequest): Promise<IPresenter> {
    if (!JwtSignKey) {
      return new ErrorPresenter({ message: 'JWT sign key is not valid!' });
    }

    const user = await this.repository.findByEmail(email);

    if (!user) {
      return new UnathorizedPresenter({ message: 'Invalid credentials!' });
    }

    const hashedPassword = hash(password, user.salt);
    const passwordValid = hashedPassword === user.password;

    if (!passwordValid) {
      return new UnathorizedPresenter({ message: 'Invalid credentials!' });
    }

    const jwt = sign({}, JwtSignKey, {
      expiresIn: 60 * 60,
      subject: user.id,
    });

    return new SuccessPresenter({
      token: jwt,
    });
  }
}
