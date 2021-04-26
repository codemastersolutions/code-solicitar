/* eslint-disable import/no-unresolved */
import User from '@models/User';
import { UserRepository } from 'src/domain/repositories';
import { getCustomRepository } from 'typeorm';

interface IPagination {
  perPage?: number,
  page?: number
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

class GetAllUsersService {
  public async execute({ page = 1, perPage = 15 }: IPagination): Promise<IPaginationResult> {
    const userRepository = getCustomRepository(UserRepository);
    const result = await userRepository.paginate({ page, perPage });

    return result;
  }
}

export default GetAllUsersService;
