/* eslint-disable import/no-unresolved */
import User from '@models/User';
import { ValidationError } from 'class-validator';
import {
  EntityRepository, Repository, Like, IsNull, Not,
} from 'typeorm';

interface IUser {
  active?: boolean,
  name: string,
  username: string,
  email: string,
  password: string
}

interface IUserSearch {
  email?: string,
  id?: string,
  name?: string,
  username?: string,
}

interface IPagination {
  fields?: IUserSearch,
  perPage?: number,
  page?: number,
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

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByName(name: string): Promise<User[] | null> {
    const user = await this.find({ where: { name: Like(`${name}%`) }, cache: true });

    return user || null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.findOne({ where: { email } });

    return user || null;
  }

  public async findByFields(fields: IUserSearch): Promise<User | null> {
    const user = await this.findOne({ where: fields });

    return user || null;
  }

  public async findByFieldsWithDeleted(fields: IUserSearch): Promise<User | null> {
    const user = await this.findOne({ where: fields, withDeleted: true });

    return user || null;
  }

  public async findByStatus(status: boolean): Promise<User[] | null> {
    const users = await this.find({ where: { active: status }, cache: true });

    return users || null;
  }

  public async findByUsername(username: string): Promise<User | null> {
    const user = await this.findOne({ where: { username } });

    return user || null;
  }

  public async findOrCreate({ email, username, ...data }: IUser): Promise<User> {
    let user = await this.findOne({ where: [{ email }, { username }] });

    if (!user) {
      user = this.create({
        email,
        username,
        ...data,
      });

      await user.validate().then(async (errors: ValidationError[]) => {
        if (errors.length > 0) {
          throw new Error(errors[0].value);
        } else {
          await this.save(user);
        }
      });
    }

    return user || null;
  }

  public async getActiveUsers(): Promise<User[] | null> {
    const users = await this.findByStatus(true);

    return users || null;
  }

  public async getDeletedUsers(): Promise<User[] | null> {
    const users = await this.find({ where: { deletedAt: Not(IsNull()) }, withDeleted: true });

    return users || null;
  }

  public async getInactiveUsers(): Promise<User[] | null> {
    const users = await this.findByStatus(false);

    return users || null;
  }

  public async paginate({
    fields, page = 1, perPage = 15,
  }: IPagination): Promise<IPaginationResult> {
    const maxPerPage = perPage > 500 ? 500 : perPage;
    const from = ((maxPerPage * page) - maxPerPage);
    const to = maxPerPage;
    const [data, total] = await this.findAndCount({
      where: fields,
      order: {
        name: 'ASC',
      },
      skip: from,
      take: to,
    });

    const result: IPaginationResult = {
      currentPage: page,
      data,
      nextPage: page + 1,
      perPage: maxPerPage,
      prevPage: page === 1 ? page : page - 1,
      total,
      lastPage: Math.round(total / maxPerPage),

    };

    return result;
  }
}

export default UserRepository;
