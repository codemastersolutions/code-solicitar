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

class GetUsersService {
  public async execute(fields: IUserSearch): Promise<User[]> {
    const fieldsArray = [];
    Object.keys(fields).map((a) => fieldsArray.push({ [a]: fields[a] }));
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.find({ where: fieldsArray });
    return users;
  }
}

export default GetUsersService;
