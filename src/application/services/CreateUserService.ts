/* eslint-disable import/no-unresolved */
import User from '@models/User';
import { UserRepository } from 'src/domain/repositories';
import { ValidationError } from 'class-validator';
import { getCustomRepository } from 'typeorm';

interface IUser {
    active?: boolean,
    email: string,
    name: string,
    password: string
    username: string,
}

class CreateUserService {
  public async execute({ email, ...data }: IUser): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const hasUser = userRepository.findOneOrFail({ where: { email } });

    if (!hasUser) {
      const user = userRepository.create({
        email,
        ...data,
      });

      await user.validate().then(async (errors: ValidationError[]) => {
        if (errors.length > 0) {
          throw new Error(errors[0].value);
        } else {
          await userRepository.save(user);
        }
      });

      return user;
    }

    return hasUser;
  }
}

export default CreateUserService;
