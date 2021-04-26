/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { CreateUserService } from 'src/infrastructure/services';
import User from '@models/User';

interface IUser {
    active?: boolean,
    name: string,
    username: string,
    email: string,
    password: string
  }

class NewUserCase {
  public async create(data: IUser): Promise<User> {
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ ...data });
    return user;
  }
}

export default NewUserCase;
