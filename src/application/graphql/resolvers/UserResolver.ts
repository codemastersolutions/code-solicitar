/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { GetAllUsersService, GetUserService } from 'src/infrastructure/services';
import User from '@models/User';
import GetUsersService from 'src/infrastructure/services/GetUsersService';

interface IUserSearch {
  email?: string,
  id?: string,
  name?: string,
  username?: string,
}

interface IPagination {
  page?: number,
  perPage?: number
}

interface IPaginationResult {
  currentPage: number,
  data: User[],
  lastPage: number,
  nextPage: number,
  perPage: number,
  prevPage: number,
  total: number
}

class UserResolver {
  public async user(args: IUserSearch): Promise<User> {
    const service = new GetUserService();
    const user = await service.execute({ ...args });
    return user;
  }

  public async users(args: IPagination): Promise<IPaginationResult> {
    const service = new GetAllUsersService();
    const users = await service.execute({ ...args });
    return users;
  }

  public async usersWithArgs(args: IUserSearch): Promise<User[]> {
    const service = new GetUsersService();
    const users = await service.execute({ ...args });
    return users;
  }
}

export default UserResolver;
