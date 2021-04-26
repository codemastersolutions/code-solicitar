/* eslint-disable import/no-unresolved */
import User from '@models/User';
import { UserRepository } from 'src/domain/repositories';
import { getCustomRepository } from 'typeorm';

interface IUserSearch {
  email?: string,
  id?: string,
  name?: string,
  username?: string,
}

class GetUserService {
  public async execute(fields: IUserSearch): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByFields(fields);
    return user;
  }
}

export default GetUserService;
